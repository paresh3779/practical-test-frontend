import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiUrls } from '../constants';
import { IResponse, IUserLoginRequest, IUserLoginResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthentication();
  }

  login(credentials: IUserLoginRequest): Observable<IUserLoginResponse> {
    return this.http.post(environment.apiUrl + ApiUrls.login, credentials).pipe(
      map((response: IUserLoginResponse) => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user_details));
        this.isAuthenticatedSubject.next(true);
        return response;
      })
    );
  }

  logout(): Observable<IResponse> {
    return this.http.post(environment.apiUrl + ApiUrls.logout, {}).pipe(
      map((response: IResponse) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.isAuthenticatedSubject.next(false);
        return response;
      })
    );
    
  }

  checkAuthentication(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
       const token = localStorage.getItem('token');
      this.isAuthenticatedSubject.next(!!token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}