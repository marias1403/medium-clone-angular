import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { CurrentUserInputInterface } from '../../shared/types/currentUserInput.interface';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl2 + '/user';
    return this.http.get(url).pipe(map(this.getUser));
  }

  updateCurrentUser(
    data: CurrentUserInputInterface,
  ): Observable<CurrentUserInterface> {
    const url = environment.apiUrl2 + '/user';
    return this.http.put(url, data).pipe(map(this.getUser));
  }
}
