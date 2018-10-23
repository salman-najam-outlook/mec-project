import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { paymentVML } from '../../models/paymentVML';
import { UserPaymentModel } from './userpayments.component';

@Injectable({
  providedIn: 'root'
})
export class UserpaymentsService {

  constructor(private http: HttpClient) { }

  getAllOrdersUserPayments(userPaymentModel: UserPaymentModel): Observable<paymentVML> {
    return this.http.post<paymentVML>('http://api.electricianpk.com/api/Order/GetOrdersPaymentsByUser', userPaymentModel
      , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }
}
