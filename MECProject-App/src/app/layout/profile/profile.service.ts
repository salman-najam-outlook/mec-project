import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { signup } from '../../models/signup';
@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    constructor(private http: HttpClient) { }

    getUserProfile(userId: number) {
        return this.http.get<signup>('http://api.electricianpk.com/api/User/getProfileDetails/' + userId
            , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
    }

    updateUserProfile(user: signup) {
        return this.http.post<signup>('http://api.electricianpk.com/api/User/updateProfileDetails', user
            , { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) });
    }
}
