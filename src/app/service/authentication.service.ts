import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, User } from '../model/auth.model';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = 'http://localhost:3000/api/v1/users';
  constructor(private http: HttpClient) { }

  loginUser(id: string): Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/getUser/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/signupUser`, user);
  }
}
