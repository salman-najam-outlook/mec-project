import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userCompleteDetails } from '../../models/userCompleteDetails.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(roleId: number): Observable<userCompleteDetails[]> {
    return this.http.get<userCompleteDetails[]>('http://api.electricianpk.com/api/User/getAllUsers/' + roleId
      , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }

  // getAllUsers(): Observable<userCompleteDetails[]> {
  //   return this.http.get<userCompleteDetails[]>('http://api.electricianpk.com/api/User/getAllUsers'
  // , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  // }

  updateUser(user: userCompleteDetails): Observable<boolean> {
    return this.http.post<boolean>('http://api.electricianpk.com/api/User/updateUserDetails', user
      , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }

  deleteUser(user: userCompleteDetails): Observable<boolean> {
    return this.http.post<boolean>('http://api.electricianpk.com/api/User/deleteUser', user
      , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }

}
