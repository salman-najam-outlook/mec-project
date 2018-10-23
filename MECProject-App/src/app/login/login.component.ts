import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    user: User;
    isError: boolean;
    errorMessage: string;
    constructor(public router: Router, private loginService: LoginService, private meta: Meta) {
        this.meta.addTag({ name: 'description', content: 'Scrap Whole Sale Dealer & Other Services...' });
        this.meta.addTag({ name: 'keywords', content: 'Electric Service, AC Service, Installation, Battery, Sale/Purchase, UPS, Repairing, CCTV, Installation, Motor Rewinding, Welding Senitary, Work Carpenter, Glass Aluminium, Carpet Washing, Scrap, WholeSale Dealer, Other Services' });
     }

    ngOnInit() {
        this.isError = false;
        this.form = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        })
    }

    onLoggedin() {
        this.loginService.onSignIn(this.form.value.username, this.form.value.password).subscribe(
            (response) => {
                localStorage.setItem('isLoggedin', 'true');
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('expires', response.expires_in);
                this.loginService.getDonorDetails().subscribe(
                    (response) => {
                        this.user = response;
                        localStorage.setItem('user', JSON.stringify(this.user));
                        this.user = JSON.parse(localStorage.getItem('user'));
                        this.router.navigate(['/dashboard']);
                    },
                    (errors) => {
                        this.isError = true;
                        this.errorMessage = 'Error while fetching record';
                        console.log('Error while fetching record');
                        setTimeout(() => {
                            this.isError = false;
                        }, 3000);
                    }
                );
            },
            (errors) => {
                if (errors.status === 400) {
                    this.isError = true;
                    this.errorMessage = 'Invalid Email or Password!';
                    setTimeout(() => {
                        this.isError = false;
                    }, 3000);
                } else {
                    this.isError = true;
                    this.errorMessage = 'Network Error... Please try later!';
                    setTimeout(() => {
                        this.isError = false;
                    }, 3000);
                }
            }
        );
    }
}
