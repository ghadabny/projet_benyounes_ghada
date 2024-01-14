import { Injectable } from '@angular/core';
import { Produit } from './models/produit';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private articles: Produit[] = [];

  ajouterAuPanier(produit: Produit) {
    let articles = this.obtenirArticles();
    let articleExistant = articles.find(p => p.ref === produit.ref);
  
    if (articleExistant) {
      articleExistant.quantite++;
    } else {
      produit.quantite = 1;
      articles.push(produit);
    }
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

  obtenirNombreArticles(): number {
        return this.articles.reduce((acc, produit) => acc + produit.quantite, 0);

  }

  augmenterQuantite(refProduit: string) {
    let article = this.articles.find(p => p.ref === refProduit);
    if (article) {
      article.quantite++;
    }
  }

  diminuerQuantite(refProduit: string) {
    let article = this.articles.find(p => p.ref === refProduit);
    if (article) {
      if (article.quantite > 1) {
        article.quantite--;
      } else {
        this.supprimerDuPanier(this.articles.indexOf(article));
      }
    }
  }

}
