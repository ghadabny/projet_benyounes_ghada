import { Injectable } from '@angular/core';
import { Produit } from './models/produit';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private articles: Produit[] = [];

  ajouterAuPanier(produit: Produit) {
    this.articles.push(produit);
  }

  obtenirArticles() {
    return this.articles;
  }

  viderPanier() {
    this.articles = [];
    return this.articles;
  }

  supprimerDuPanier(index: number) {
    this.articles.splice(index, 1);
  }
}
