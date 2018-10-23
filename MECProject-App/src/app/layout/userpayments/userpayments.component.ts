import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from '../../models/order.model';
import { OrderGrid } from '../../models/orderGrid';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ModalComponent, AlertComponent } from '../bs-component/components';
import { OrderView } from '../../models/order.model';
import { paymentVM } from '../../models/paymentVM';
import { User } from '../../models/user.model';
import { paymentVML } from '../../models/paymentVML';
import { UserpaymentsService } from './userpayments.service';
@Component({
    selector: 'app-userpayments',
    templateUrl: './userpayments.component.html',
    animations: [routerTransition()]
})

export class UserPaymentsComponent implements OnInit {
    public isNewOrder: boolean;
    public isTrackingId: boolean;
    public paymentStatus: string;
    public orderButton: string;
    public order: Order = new Order();
    public updateOrderId: number;
    public viewOrder: OrderView = new OrderView();
    public orderToDelete: OrderGrid;
    orders: OrderGrid[];
    form: FormGroup;
    viewForm: FormGroup;
    user: User;
    userPaymentModel: UserPaymentModel = new UserPaymentModel();
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
    public isButtonHidden: boolean = true;
    paymentOrderList: paymentVML = new paymentVML();
    paymentOrderListshow: paymentVM[];
    // For External Components Ends
    p: number = 1;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userPaymentService: UserpaymentsService
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
        });

        this.form = new FormGroup({
            emailId: new FormControl('', [Validators.required, Validators.email]),
            paymentStatus: new FormControl('', Validators.required),
        })
        this.isNewOrder = true;
    }
    ngOnInit() { }

    onUserPaymentsmSubmit() {
        this.userPaymentModel.emailId = this.form.value.emailId;
        this.userPaymentModel.status = this.form.value.paymentStatus;
        this.userPaymentService.getAllOrdersUserPayments(this.userPaymentModel).subscribe(
            (response) => {
                this.paymentOrderListshow = response.paymentList;
                this.paymentOrderList = response;
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while updating fetching user payments!',
                    });
                }
            }
        );
    }
}

export class UserPaymentModel {
    emailId: string;
    status: string;
}
