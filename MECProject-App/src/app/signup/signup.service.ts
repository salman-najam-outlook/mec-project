import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {signup} from '../models/signup';
import { Email } from './signup.component';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  addUser(user:signup)
  {
    return this.http.post<signup>('http://api.electricianpk.com/api/User/registerUser', user);
  }

  hasEmailRegistered(email: Email): Observable<boolean> {
    return this.http.post<boolean>('http://api.electricianpk.com/api/User/HasEmailRegistered', email);
}


}
