import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { complaintss } from '../../models/complaints';
import { complaintsGrid } from '../../models/complaintsGrid';
@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  constructor(private http: HttpClient) { }

  addOrderComplaint(complaint: complaintss): Observable<string> {
    return this.http.post<string>('http://api.electricianpk.com/api/Order/addOrderCompaint', complaint
      , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }

  getAllOrdersComplaints(status: string, userId: number): Observable<complaintsGrid[]> {
    return this.http.get<complaintsGrid[]>('http://api.electricianpk.com/api/Order/GetOrderComplaints/' + status + '/' + userId
      , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }

  updateOrderStatus(value: complaintsGrid) {
    return this.http.post('http://api.electricianpk.com/api/Order/updateOrdeComplaintStatus/', value
      , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }
}
