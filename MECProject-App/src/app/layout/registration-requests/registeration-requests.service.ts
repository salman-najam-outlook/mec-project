import { Injectable } from '@angular/core';
import { signup } from '../../models/signup';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RegisterationRequestsService {

  constructor(private http: HttpClient) { }

  getAllpendingUsers(): Observable<signup[]> {
    return this.http.get<signup[]>('http://api.electricianpk.com/api/User/GetPendingUsers'
      , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }

  updateStatus(value: signup) {
    return this.http.post('http://api.electricianpk.com/api/User/updateUserStatus/', value
      , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }
}
