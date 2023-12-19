import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, fromEvent, of } from 'rxjs';
import { Produit } from './models/produit';
import { startWith, map, distinctUntilChanged, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { PanierService } from './panier.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
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
  
  viderPanier() {
    this.panierService.viderPanier();
  }

  ajouterAuPanier(produit: Produit) {
    this.panierService.ajouterAuPanier(produit);
    this.ajoutConfirmation.set(produit, true);
    setTimeout(() => this.ajoutConfirmation.set(produit, false), 3000);
  }


  
ngOnInit() {
  this.produits$ = this.searchControl.valueChanges.pipe(
    startWith(''), // Démarre avec une chaîne vide pour charger tous les produits initialement
    debounceTime(300),
    switchMap(value => value ? this.apiService.getSearchCatalogue(value) : this.apiService.getCatalogue()),
    catchError(() => of([])) // En cas d'erreur, retourne un tableau vide
  );
}
  connexion() {
      this.apiService.loginClient(this.login, this.password).subscribe((client) => {
      this.nom = client.nom;
      this.prenom = client.prenom;
      this.cnx = true;
    });
  }


  inscription() {
  this.apiService.inscrireClient(this.nom, this.prenom,this.email,this.password).subscribe({
    next: (response) => {
      console.log('Inscription réussie:', response);
      this.afficherInscription = false;
      this.cnx = true;
      this.nom = response.nom;
      this.prenom = response.prenom;
    }
  });
}

calculerEtAfficherTotalPanier() {
  let totalTemporaire = 0; // Utilisez une variable locale temporaire
  const articles = this.obtenirArticles();
  articles.forEach(article => {
    totalTemporaire += article.prix; // Additionner les prix sur la variable locale
  });
  this.totalPanier = totalTemporaire; // Affectez le total temporaire à totalPanier
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



