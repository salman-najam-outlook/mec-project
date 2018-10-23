import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ModalComponent, AlertComponent } from '../bs-component/components';
import { User } from '../../models/user.model';
import { signup } from '../../models/signup';
import { ProfileService } from './profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {
    public orderStatus: string;
    form: FormGroup;
    user: User;
    userProfile: signup;
    // For External Components Starts
    @ViewChild(ModalComponent) modal: ModalComponent;
    @ViewChild(AlertComponent) alert: AlertComponent;
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public orderId: number;
    public content: any;
    public modalHeader: string;
    public modalBody: any;
    public isDisabled: boolean;
    public isHidden: boolean = false;
    // For External Components Ends

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private profileService: ProfileService
    ) {
        // This code will execute evertime same component route has been called 
        // route.params.subscribe(val => {
        //     // put the code from `ngOnInit` here
        //     this.orderStatus = this.route.snapshot.paramMap.get('id');
        //   });
        //
        // OR ANOTHER EXAMPLE IS:
        // constructor(private router: Router) {
        //     // override the route reuse strategy
        //     this.router.routeReuseStrategy.shouldReuseRoute = function() {
        //         return false;
        //     };
        // }
        route.params.subscribe(val => {
            // put the code from `ngOnInit` here
            this.orderStatus = this.route.snapshot.paramMap.get('id');
        });

        this.form = new FormGroup({
            userid: new FormControl(''),
            commission: new FormControl(''),
            username: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            shopname: new FormControl('', Validators.required),
            shopaddress: new FormControl('', Validators.required),
            bankname: new FormControl('', Validators.required),
            bankbranch: new FormControl('', Validators.required),
            accountnumber: new FormControl('', Validators.required),
        })

        this.user = JSON.parse(localStorage.getItem('user'));
        this.profileService.getUserProfile(this.user.Userid).subscribe(
            (response) => {
                this.userProfile = response;
                this.form.controls["userid"].setValue(this.userProfile.userId);
                this.form.controls["username"].setValue(this.userProfile.username);
                this.form.controls["email"].setValue(this.userProfile.email);
                this.form.controls["email"].disable();
                this.form.controls["phone"].setValue(this.userProfile.phone);
                this.form.controls["password"].setValue(this.userProfile.password);
                this.form.controls["shopname"].setValue(this.userProfile.shopname);
                this.form.controls["shopaddress"].setValue(this.userProfile.shopaddress);
                this.form.controls["bankname"].setValue(this.userProfile.bankname);
                this.form.controls["bankbranch"].setValue(this.userProfile.bankbranch);
                this.form.controls["accountnumber"].setValue(this.userProfile.accountnumber);
                this.form.controls["commission"].setValue(this.userProfile.commission);
                this.form.controls["commission"].disable();
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while fetching your profile details!',
                    });
                }
            }
        )
    }

    ngOnInit() {

    }

    onUpdateProfile() {
        this.userProfile.userId = this.form.value.userid;
        this.userProfile.username = this.form.value.username;
        this.userProfile.email = this.form.value.email;
        this.userProfile.phone = this.form.value.phone;
        this.userProfile.password = this.form.value.password;
        this.userProfile.shopname = this.form.value.shopname;
        this.userProfile.shopaddress = this.form.value.shopaddress;
        this.userProfile.bankname = this.form.value.bankname;
        this.userProfile.bankbranch = this.form.value.bankbranch;
        this.userProfile.accountnumber = this.form.value.accountnumber;
        this.userProfile.commission = this.form.value.commission;
        this.profileService.updateUserProfile(this.userProfile).subscribe(
            (response) => {
                this.profileService.getUserProfile(this.user.Userid).subscribe(
                    (response) => {
                        this.userProfile = response;
                        this.form.controls["userid"].setValue(this.userProfile.userId);
                        this.form.controls["username"].setValue(this.userProfile.username);
                        this.form.controls["email"].setValue(this.userProfile.email);
                        this.form.controls["email"].disable();
                        this.form.controls["phone"].setValue(this.userProfile.phone);
                        this.form.controls["password"].setValue(this.userProfile.password);
                        this.form.controls["shopname"].setValue(this.userProfile.shopname);
                        this.form.controls["shopaddress"].setValue(this.userProfile.shopaddress);
                        this.form.controls["bankname"].setValue(this.userProfile.bankname);
                        this.form.controls["bankbranch"].setValue(this.userProfile.bankbranch);
                        this.form.controls["accountnumber"].setValue(this.userProfile.accountnumber);
                        this.form.controls["commission"].setValue(this.userProfile.commission);
                        this.form.controls["commission"].disable();
                    },
                    (errors) => {
                        this.alert.alerts.push({
                            id: 1,
                            type: 'danger',
                            message: 'An error occured, while fetching your updated profile details!',
                        });
                    }
                )
                this.alert.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'Your profile has been updated, successfully!',
                });
            },
            (errors) => {
                this.alert.alerts.push({
                    id: 1,
                    type: 'danger',
                    message: 'An error occured, while updating your profile details!',
                });
            }
        )
    }

    onCancleProfile() {
        this.router.navigate(['dashboard']);
    }
}
