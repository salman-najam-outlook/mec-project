import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dashboardOrderCount } from '../../models/dashboardOrderCount';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getAllOrdersCounts(userId: number): Observable<dashboardOrderCount> {
    return this.http.get<dashboardOrderCount>('http://api.electricianpk.com/api/Order/GetOrderCountByStatus/' + userId
    , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
  }
}
