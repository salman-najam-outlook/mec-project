import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { signup } from '../../models/signup';
import { RegisterationRequestsService } from '../registration-requests/registeration-requests.service';
import { AlertComponent } from '../bs-component/components';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration-requests',
    templateUrl: './registration-requests.component.html',
    styleUrls: ['./registration-requests.component.scss'],
    animations: [routerTransition()]
})

export class RegistrationRequestsComponent implements OnInit {
    pendingUsers: signup[];
    public alerts: Array<any> = [];
    p: number = 1;
    @ViewChild(AlertComponent) alert: AlertComponent;

    constructor(private RegisterationRequestsService: RegisterationRequestsService, private router: Router) { }

    ngOnInit() {
        this.getPendingUsers();
    }

    getPendingUsers() {
        this.RegisterationRequestsService.getAllpendingUsers().subscribe(
            (response) => {
                this.pendingUsers = response;
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while fetching records!',
                    });
                }
            }
        );
    }

    onStatusChange(x, p: signup) {
        p.status = x;
        this.RegisterationRequestsService.updateStatus(p).subscribe(
            (response) => {
                this.getPendingUsers();
                this.alert.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'Pending request has been approved, successfully!',
                });
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while updating pending request!',
                    });
                }
            }
        );
    }
}
