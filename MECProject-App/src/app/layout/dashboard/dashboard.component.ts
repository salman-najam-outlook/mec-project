import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ModalComponent, AlertComponent } from '../bs-component/components';
import { DashboardService } from '../dashboard/dashboard.service';
import { dashboardOrderCount } from '../../models/dashboardOrderCount';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    @ViewChild(ModalComponent) modal: ModalComponent;
    @ViewChild(AlertComponent) alert: AlertComponent;
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public orderId: number;
    public content: any;
    public modalHeader: string;
    public modalBody: any;
    public isDisabled: boolean;
    errorObj: any;
    user: User;
    public dashboardOrderCount: dashboardOrderCount = new dashboardOrderCount();
    constructor(private DashboardService: DashboardService, private router: Router) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );
    }

    ngOnInit() {
        this.getOrderCount();
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    getOrderCount() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.DashboardService.getAllOrdersCounts(this.user.Userid).subscribe(
            (res) => {
                this.dashboardOrderCount = res;
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while fetching order counts!',
                    });
                }
            }
        );

    }

    setOrderId(orderId: number, content: any) {
        this.modalHeader = "Order Details";
        this.modalBody = orderId;
        this.isDisabled = true;
        this.modal.open(content);
        this.alert.alerts.push({
            id: 1,
            type: 'danger',
            message: 'This is an success alert',
        });
    }
}
