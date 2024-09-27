import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryDTO } from './../models/country/country.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = `${environment.apiBaseUrl}/countries`;

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<CountryDTO[]> {
    return this.http.get<CountryDTO[]>(this.apiUrl);
  }

  createCountry(countryDTO: CountryDTO): Observable<CountryDTO> {
    return this.http.post<CountryDTO>(this.apiUrl, countryDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getCountryById(id: number): Observable<CountryDTO> {
    return this.http.get<CountryDTO>(`${this.apiUrl}/${id}`);
  }

  getCountryByName(name: string): Observable<CountryDTO> {
    return this.http.get<CountryDTO>(`${this.apiUrl}/name/${name}`);
  }
}
