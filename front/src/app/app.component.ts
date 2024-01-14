import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, fromEvent, of } from 'rxjs';
import { Produit } from './models/produit';
import { startWith, map, distinctUntilChanged, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { FormControl, FormGroup,Validators  } from '@angular/forms';
import { PanierService } from './panier.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  inscriptionForm!: FormGroup;
  afficherPanier: boolean = false;
  afficherCatalogue: boolean = false;
  totalPanier: number | null = null;
  model!: Observable<Produit[]>;
  name = 'Angular';
  searchField$!: Observable<string>;
  @ViewChild('input', { static: true }) input!: ElementRef;
  login: string = '';
  password: string = '';
  nom: string = '';
  prenom: string = '';
  cnx: boolean = false;
  produits$: Observable<Array<Produit>>;
  searchControl = new FormControl();
  searchFailed: boolean = false;
  articleAjoute: boolean = false;
  ajoutConfirmation: Map<Produit, boolean> = new Map();
  email: string = '';
  afficherInscription: boolean = false;
  adresse: string = '';
  codepostal: string = '';
  ville: string = '';
  sexe: string = '';
  telephone: string = '';
  errorMessage: string = '';
  InscrerrorMessage: string='';
  private articles: Produit[] = [];

  

  constructor(private apiService: ApiService, private panierService: PanierService) {
    this.produits$ = this.apiService.getCatalogue();
  }

  basculerPanier() {
    this.afficherPanier = !this.afficherPanier;
  }

  basculerInscription() {
    this.afficherInscription = !this.afficherInscription;
  }
  obtenirArticles() {
    return this.panierService.obtenirArticles();
  }
  
  supprimerDuPanier(index: number) {
    this.panierService.supprimerDuPanier(index);
  }
  incrementerQuantite(refProduit: string) {
    this.panierService.augmenterQuantite(refProduit);
  }

  decrementerQuantite(refProduit: string) {
    this.panierService.diminuerQuantite(refProduit);
  }

  viderPanier() {
    this.panierService.viderPanier();
  }

  ajouterAuPanier(produit: Produit) {
    this.panierService.ajouterAuPanier(produit );
    this.ajoutConfirmation.set(produit, true);
    setTimeout(() => this.ajoutConfirmation.set(produit, false), 3000);
  }

  obtenirNombreArticlesPanier(): number {
    return this.panierService.obtenirNombreArticles();
  }

  calculerEtAfficherTotalPanier() {
    let totalTemporaire = 0;
    const articles = this.obtenirArticles();
    articles.forEach(article => {
      totalTemporaire += article.prix * article.quantite; // Calculez le total pour chaque article
    });
    this.totalPanier = totalTemporaire; // Mettez à jour le total global du panier
  }
  
  

  passerCommande() {
    if (this.obtenirArticles().length > 0) {
      this.calculerEtAfficherTotalPanier();
      alert("Votre total est de "+this.totalPanier+"€. Merci pour votre achat !");
      this.viderPanier();
    } else {
      alert("Votre panier est vide.");
    }
  }


  
  ngOnInit() {
    this.inscriptionForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      adresse: new FormControl(''), // Adresse n'est pas obligatoire
      codepostal: new FormControl('', Validators.pattern(/^[0-9]{5}$/)), // Exemple de regex pour un code postal français
      ville: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      sexe: new FormControl('non spécifié'), // Valeur par défaut
      login: new FormControl('', Validators.required), // Exemple de longueur minimale
      password: new FormControl('',Validators.required), // Exemple de longueur minimale
      telephone: new FormControl('', Validators.pattern(/^[0-9]{10}$/)) // Exemple de regex pour un numéro de téléphone français
    });
  
    // Configuration de la logique de recherche dans le catalogue
    this.produits$ = this.searchControl.valueChanges.pipe(
      startWith(''), 
      debounceTime(300),
      switchMap(value => value ? this.apiService.getSearchCatalogue(value) : this.apiService.getCatalogue()),
      catchError(() => of([]))
    );
  }


  connexion() {
    this.apiService.loginClient(this.login, this.password).subscribe(
      (client) => {
        this.nom = client.nom;
        this.prenom = client.prenom;
        this.cnx = true;
      },
      (error) => {
        console.error('Erreur de connexion:', error);
        this.cnx = false;
        this.errorMessage = "Login ou Mot de passe incorrect !!";
      }
    );
  }


inscription() {
  // Vérifier si le formulaire est valide
  if (this.inscriptionForm.valid) {
    // Récupérer les valeurs du formulaire
    const formValue = this.inscriptionForm.value;
    
    // Appel du service API pour l'inscription
    this.apiService.inscrireClient(
      formValue.nom, formValue.prenom, formValue.email, formValue.password,
      formValue.adresse, formValue.codepostal, formValue.ville, 
      formValue.sexe, formValue.login, formValue.telephone
    ).subscribe({
      next: (response) => {
        console.log('Inscription réussie:', response);
        this.afficherInscription = false;
        // Mettre à jour les propriétés en fonction de la réponse, si nécessaire
        // Rediriger l'utilisateur ou afficher un message de succès
      },
      error: (err) => {
        if (err.status === 400 ) {
            // L'utilisateur existe déjà
            this.InscrerrorMessage = "L'utilisateur éxiste déjà. Veuillez utiliser mail et login différent";
        } else {
            // Autre erreur
            this.InscrerrorMessage = "Erreur lors de l'inscription. Veuillez réessayer.";
        }
    }
    });
  } else {
    
    // Gérer les erreurs de validation
    this.InscrerrorMessage = "Veuillez remplir correctement tous les champs obligatoires.";
  }
}



  


  searchProducts(searchTerm: string) {
    if (!searchTerm) {
      this.produits$ = this.apiService.getCatalogue();
    } else {
      this.produits$ = this.apiService.getSearchCatalogue(searchTerm);
    }
  }

 


  ngAfterViewInit() {
    this.searchField$ = fromEvent(this.input.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(300),
      distinctUntilChanged(),
    );

    this.model = this.searchField$.pipe(
      switchMap(term => this.apiService.getSearchCatalogue(term).pipe(
        catchError(() => of([]))
      ))
    );
  }
}



