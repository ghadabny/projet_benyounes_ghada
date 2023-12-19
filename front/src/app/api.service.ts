import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './models/client';
import { Produit } from './models/produit';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public loginClient(login: string, password: string): Observable<Client> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'login=' + login + '&password=' + password;
    return this.http.post<Client>(
      environment.backendLoginClient,
      data,
      httpOptions
    );
  }

  public inscrireClient(nom: string, prenom: string, email: string, password: string): Observable<any> {
    const data = {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password
    };
    return this.http.post<any>(environment.backendInscriptionUrl, data);
  }

  public getCatalogue(): Observable<Produit[]> {
    return this.http.get<Produit[]>(environment.backendCatalogue);
  }

  public getSearchCatalogue(searchTerm: string): Observable<Produit[]> {
    const url = `${environment.backendSearchCatalogue}?filtre=${searchTerm}`;
    return this.http.get<Produit[]>(url);  // Ajout du paramètre de recherche à l'URL
  }
}
