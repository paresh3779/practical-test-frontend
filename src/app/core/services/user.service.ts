import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserRequest, IUserResponse } from '../interfaces';
import { environment } from '../../../environments/environment';
import { ApiUrls } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /** Resgiter user API call */
  userRegister(registerData: IUserRequest): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(environment.apiUrl + ApiUrls.userRegister, registerData );
  }
}
