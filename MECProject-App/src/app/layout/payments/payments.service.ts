import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { paymentVML } from '../../models/paymentVML';
@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  getAllOrdersPayments(status: string, userId: number): Observable<paymentVML> {
    return this.http.get<paymentVML>('http://api.electricianpk.com/api/Order/GetOrdersPayments/' + status + '/' + userId
      , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }
}
