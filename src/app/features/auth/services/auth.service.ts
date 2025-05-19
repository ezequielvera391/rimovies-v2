import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginResponse } from 'src/app/core/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<loginResponse> {
    let loginUrl: string = this.url + '/login';
    return this.http.post<loginResponse>(loginUrl, { email, password });
  }
}
