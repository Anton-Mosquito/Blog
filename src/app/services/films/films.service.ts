import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFilmDetail, IFilms, IFilmsOriginal } from 'src/app/components/films/model/films.interface';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  ROOT_URL = 'http://www.omdbapi.com/?';
  API_KEY = '1163afb2'

  constructor(private http: HttpClient) { }

  getFilms(title: string, type: string): Observable<IFilms> {

    const options = {
      params: {
      s: title,
      type: type,
      apikey: this.API_KEY
     },
    }

    return this.http.get<IFilmsOriginal>(this.ROOT_URL, options).pipe(
      map(({Search, totalResults}) => ({Search, totalResults}))
    )
  }

  getFilmDetails(id: string): Observable<IFilmDetail> {

    const options = {
      params: {
      i: id,
      apikey: this.API_KEY
     },
    }

    return this.http.get<IFilmDetail>(this.ROOT_URL, options)
  }

  getPage(page: string, title: string, type: string): Observable<IFilms> {

    const options = {
      params: {
        s: title,
        type: type,
        page: page,
        apikey: this.API_KEY
     },
    }

    return this.http.get<IFilmsOriginal>(this.ROOT_URL, options).pipe(
      map(({Search, totalResults}) => ({Search, totalResults}))
    )
  }
}
