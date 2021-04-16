import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ROOT_URL = 'https://someUrls';

  constructor(private http: HttpClient) {}


  public logIn(login: string ,password: string): Observable<any> {

    const options = {
      headers: {
        Authentication: {login, password},
      }
    }

    return this.http.post<any>(this.ROOT_URL, options);
  }

  public registry (body: any): Observable<any> {
    return this.http.post<any>(this.ROOT_URL, body);
  }
}
