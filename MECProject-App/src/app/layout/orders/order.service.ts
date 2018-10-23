import { Injectable } from '@angular/core';
import { OrderGrid } from '../../models/orderGrid';
import { Order } from '../../models/order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  constructor(private http: HttpClient) { }

  addOrder(user: Order) {
    return this.http.post<Order>('http://api.electricianpk.com/api/Order/addOrder', user
    , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }

  UpdateOrder(user: Order) {
    return this.http.post<Order>('http://api.electricianpk.com/api/Order/updateOrder', user
    , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }

  getAllOrders(status: string, userId: number): Observable<OrderGrid[]> {
    return this.http.get<OrderGrid[]>('http://api.electricianpk.com/api/Order/GetOrders/' + status + '/' + userId
    , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }

  deleteOrder(value: OrderGrid): Observable<string> {
    return this.http.post<string>('http://api.electricianpk.com/api/Order/Delete', value
    , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }

  updateOrderStatus(value: OrderGrid) {
    return this.http.post('http://api.electricianpk.com/api/Order/updateOrderStatus/', value
    , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }
}
