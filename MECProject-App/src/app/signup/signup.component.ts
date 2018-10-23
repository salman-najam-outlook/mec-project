import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../signup/signup.service';
import { signup } from '../models/signup';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    form: FormGroup;
    isSignUp: boolean;
    isError: boolean = false;
    public user: signup = new signup();
    email: Email = new Email();
    public isEmailAvailable: boolean;
    constructor(private SignupService: SignupService) { }

    ngOnInit() {
        this.isSignUp = true;
        this.isEmailAvailable = false;
        this.form = new FormGroup({
            username: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            shopname: new FormControl('', Validators.required),
            shopaddress: new FormControl('', Validators.required),
            bankname: new FormControl('', Validators.required),
            bankbranch: new FormControl('', Validators.required),
            accountnumber: new FormControl('', Validators.required),
            commission: new FormControl('', Validators.required),
            cnic: new FormControl('',[Validators.required,Validators.minLength(13),Validators.maxLength(13)]),
            city: new FormControl('',Validators.required)
        })
    }

    onRegister() {
        const formModel = this.form.value;
        this.user.accountnumber = formModel.accountnumber;
        this.user.bankbranch = formModel.bankbranch;
        this.user.bankname = formModel.bankname;
        this.user.commission = formModel.commission;
        this.user.email = formModel.email;
        this.user.password = formModel.password;
        this.user.phone = formModel.phone;
        this.user.shopaddress = formModel.shopaddress;
        this.user.shopname = formModel.shopname;
        this.user.username = formModel.username;
        this.user.cnic = formModel.cnic;
        this.user.city = formModel.city;
        this.SignupService.addUser(this.user).subscribe(
            (response) => {
                this.isSignUp = false;
            },
            (error) => {
                this.isError = true;
            }
        );
    }

    focusOutFunction() {
        this.email.emailId = this.form.value.email;
        this.SignupService.hasEmailRegistered(this.email).subscribe(
          (response) => {
            if (response === true) {
              this.isEmailAvailable = true;
              this.form.controls["email"].setValue('');
            } else if (response === false) {
              this.isEmailAvailable = false;
            }
          },
          (errors) => {
            console.log(errors);
          }
        )
      }
}


export class Email {
    emailId: string;
}
