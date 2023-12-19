import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:443/api/catalogue'

  constructor(private http: HttpClient) { }

  getSearchResults(searchTerm: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/getSearchCatalogue?filtre=${searchTerm}`);
  }
}

