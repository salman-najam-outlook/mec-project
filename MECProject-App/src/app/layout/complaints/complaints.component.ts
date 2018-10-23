import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { ModalComponent, AlertComponent } from '../bs-component/components';
import { ActivatedRoute, Router } from '@angular/router';
import { complaintss } from '../../models/complaints';
import { ComplaintsService } from './complaints.service';
import { complaintsGrid } from '../../models/complaintsGrid';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-complaints',
    templateUrl: './complaints.component.html',
    styleUrls: ['./complaints.component.scss'],
    animations: [routerTransition()]
})
export class ComplaintsComponent implements OnInit {
    public complaintStatus: string;
    complaintss: complaintss = new complaintss();
    form: FormGroup;
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
    public compgrid: complaintsGrid[] = [];
    user: User;
    // For External Components Ends
    p: number = 1;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ComplaintsService: ComplaintsService
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
            this.complaintStatus = this.route.snapshot.paramMap.get('id');
            this.getOrderComplaints();
        });
        this.form = new FormGroup({
            ordernumber: new FormControl('', Validators.required),
            reason: new FormControl('', Validators.required),
        })
    }

    ngOnInit() {
    }

    onNewComplaint() {
        this.isHidden = true;
    }

    onCancelComplaint() {
        this.isHidden = false;
        this.form.controls["reason"].setValue('');
    }

    onOrderFormSubmit() {
        const formModel = this.form.value;
        this.complaintss.ordernumber = formModel.ordernumber;
        this.complaintss.reason = formModel.reason;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.complaintss.userId = this.user.Userid;
        this.ComplaintsService.addOrderComplaint(this.complaintss).subscribe(
            (response: string) => {
                if (response === 'found') {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'success',
                        message: 'New complaint has been generated, successfully!',
                    });
                    this.onCancelComplaint();
                    this.getOrderComplaints();
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'No record found against given Tracking ID or invalid Tracking ID!',
                    });
                }
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while generating new complaint!',
                    });
                }
            }
        );

    }

    getOrderComplaints() {
        var id = this.route.snapshot.paramMap.get('id');
        this.user = JSON.parse(localStorage.getItem('user'));
        this.ComplaintsService.getAllOrdersComplaints(id, this.user.Userid).subscribe(
            (response) => {
                this.compgrid = response;
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while fetching complaints!',
                    });
                }
            }
        );
    }

    onStatusChange(x, ob: complaintsGrid) {

        ob.status = x;
        this.ComplaintsService.updateOrderStatus(ob).subscribe(
            (response) => {
                this.getOrderComplaints();
                this.alert.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'Complaint status has been updated, successfully!',
                });
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while changing complaint status!',
                    });
                }
            }
        );
    }
}
