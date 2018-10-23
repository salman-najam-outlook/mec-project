import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private httpClient: HttpClient) { }

    onSignIn(email: string, password: string): Observable<any> {
        let reqheaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var data = "username=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password) + "&grant_type=password";
        return this.httpClient.post<any>('http://api.electricianpk.com/token', data, { headers: reqheaders });
    }

    getDonorDetails(): Observable<User> {
        return this.httpClient.get<User>('http://api.electricianpk.com/api/Misc/GetDonorClaims'
            , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
    }

}

