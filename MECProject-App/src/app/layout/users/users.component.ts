import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ModalComponent, AlertComponent } from '../bs-component/components';
import { userCompleteDetails } from '../../models/userCompleteDetails.model';
import { UserService } from './users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [routerTransition()]
})

export class UsersComponent implements OnInit {
    public usersList: userCompleteDetails[];
    public form: FormGroup;
    public isHidden: boolean;
    public viewForm: FormGroup;
    public userToUpdate = new userCompleteDetails();
    public userToDelete = new userCompleteDetails();
    public isUpdateButton: boolean;
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
    // For External Components Ends
    p: number = 1;
    user: User;
    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.isHidden = false;
        this.form = new FormGroup({
            userid: new FormControl(''),
            roleid: new FormControl(''),
            username: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            shopname: new FormControl('', Validators.required),
            shopaddress: new FormControl('', Validators.required),
            bankname: new FormControl('', Validators.required),
            bankbranch: new FormControl('', Validators.required),
            accountnumber: new FormControl('', Validators.required),
            commission: new FormControl('', Validators.required),
        });
        this.userService.getAllUsers(this.user.Roleid).subscribe(
            (response) => {
                this.usersList = response;
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while fetching user records!',
                    });
                }
            }
        );
    }

    onUserView(user: userCompleteDetails) {
        this.form.controls["userid"].setValue(user.user_ID);
        this.form.controls["roleid"].setValue(user.role_ID);
        this.form.controls["username"].setValue(user.user_name);
        this.form.controls["username"].disable();
        this.form.controls["email"].setValue(user.user_email);
        this.form.controls["email"].disable();
        this.form.controls["phone"].setValue(user.user_phone);
        this.form.controls["phone"].disable();
        this.form.controls["password"].setValue(user.user_password);
        this.form.controls["password"].disable();
        this.form.controls["shopname"].setValue(user.shopkeeper_shopname);
        this.form.controls["shopname"].disable();
        this.form.controls["shopaddress"].setValue(user.shopkeeper_shopaddress);
        this.form.controls["shopaddress"].disable();
        this.form.controls["bankname"].setValue(user.shopkeeper_bank_name);
        this.form.controls["bankname"].disable();
        this.form.controls["bankbranch"].setValue(user.shopkeeper_bank_branch);
        this.form.controls["bankbranch"].disable();
        this.form.controls["accountnumber"].setValue(user.shopkeeper_bank_account);
        this.form.controls["accountnumber"].disable();
        this.form.controls["commission"].setValue(user.shopkeeper_commission);
        this.form.controls["commission"].disable();
        this.isUpdateButton = false;
        this.isHidden = true;
    }

    onUserEdit(user: userCompleteDetails) {
        this.form.controls["userid"].setValue(user.user_ID);
        this.form.controls["roleid"].setValue(user.role_ID);
        this.form.controls["username"].setValue(user.user_name);
        this.form.controls["username"].enable();
        this.form.controls["email"].setValue(user.user_email);
        this.form.controls["email"].disable();
        this.form.controls["phone"].setValue(user.user_phone);
        this.form.controls["phone"].enable();
        this.form.controls["password"].setValue(user.user_password);
        this.form.controls["password"].disable();
        this.form.controls["shopname"].setValue(user.shopkeeper_shopname);
        this.form.controls["shopname"].enable();
        this.form.controls["shopaddress"].setValue(user.shopkeeper_shopaddress);
        this.form.controls["shopaddress"].enable();
        this.form.controls["bankname"].setValue(user.shopkeeper_bank_name);
        this.form.controls["bankname"].enable();
        this.form.controls["bankbranch"].setValue(user.shopkeeper_bank_branch);
        this.form.controls["bankbranch"].enable();
        this.form.controls["accountnumber"].setValue(user.shopkeeper_bank_account);
        this.form.controls["accountnumber"].enable();
        this.form.controls["commission"].setValue(user.shopkeeper_commission);
        this.form.controls["commission"].enable();
        this.isUpdateButton = true;
        this.isHidden = true;
    }

    onUserUpdate() {
        this.userToUpdate.shopkeeper_bank_account = this.form.value.accountnumber;
        this.userToUpdate.shopkeeper_bank_branch = this.form.value.bankbranch;
        this.userToUpdate.shopkeeper_bank_name = this.form.value.bankname;
        this.userToUpdate.shopkeeper_commission = this.form.value.commission;
        this.userToUpdate.user_phone = this.form.value.phone;
        this.userToUpdate.role_ID = this.form.value.roleid;
        this.userToUpdate.shopkeeper_shopaddress = this.form.value.shopaddress;
        this.userToUpdate.shopkeeper_shopname = this.form.value.shopname;
        this.userToUpdate.user_ID = this.form.value.userid;
        this.userToUpdate.user_name = this.form.value.username;
        this.userService.updateUser(this.userToUpdate).subscribe(
            (response) => {
                this.isHidden = false;
                this.alert.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'User record has been updated, successfully!',
                });
                this.userService.getAllUsers(this.user.Roleid).subscribe(
                    (response) => {
                        this.usersList = response;
                    }
                );
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while updating user record!',
                    });
                }
            }
        )
    }

    openDeleteConfirmation(user: userCompleteDetails, content: any) {
        this.userToDelete = user;
        this.modalHeader = "Delete User";
        this.isDisabled = true;
        this.viewForm = content;
        this.modal.open(content);
    }

    deleteUserFun(user: userCompleteDetails) {
        this.userService.deleteUser(user).subscribe(
            (response) => {
                if (response === true) {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'success',
                        message: 'User has been deleted, successfully!',
                    });
                    this.userService.getAllUsers(this.user.Roleid).subscribe(
                        (response) => {
                            this.usersList = response;
                        }
                    );
                }
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while deleting user!',
                    });
                }
            }
        );
    }

    onCancelUserEdit() {
        this.isHidden = false;
        this.form.reset(this.form.value);
    }
}
