import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ICountries } from 'src/app/components/country/model/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  ROOT_URL = 'https://restcountries.eu/rest/v2';

  constructor(private http: HttpClient) { }


  getAllCountries(): Observable<Array<ICountries>> {
    const options = {
      params: {
      all: 'all'
     },
    }

    return this.http.get<Array<ICountries>>(this.ROOT_URL, options).pipe(
      delay(1000)
    )
  }

  getFilteredCountries(value: string): Observable<Array<ICountries>>{
    return this.http.get<Array<ICountries>>(`${this.ROOT_URL}/regionalbloc/${value}`).pipe(
      delay(1000)
    )
  }
}
