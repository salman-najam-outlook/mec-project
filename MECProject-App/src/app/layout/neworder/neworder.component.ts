import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from '../../models/order.model';
import { OrderGrid } from '../../models/orderGrid';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ModalComponent, AlertComponent } from '../bs-component/components';
import { OrderView } from '../../models/order.model';
import { User } from '../../models/user.model';
import { OrderService } from '../orders/order.service';

@Component({
    selector: 'app-neworder',
    templateUrl: './neworder.component.html',
    animations: [routerTransition()]
})

export class NewOrderComponent implements OnInit {
    public isNewOrder: boolean;
    public isTrackingId: boolean;
    public orderStatus: string;
    public orderButton: string;
    public order: Order = new Order();
    public updateOrderId: number;
    public viewOrder: OrderView = new OrderView();
    public orderToDelete: OrderGrid;
    orders: OrderGrid[];
    form: FormGroup;
    viewForm: FormGroup;
    user: User;
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
    // For External Components Ends
    p: number = 1;
    collection: any[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private orderservice: OrderService,

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
            name: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.required),
            amount: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            service: new FormControl('', Validators.required),
        })
        this.isNewOrder = true;
    }

    ngOnInit() { }

    onNewOrder() {
        this.orderButton = "Confirm Order";
        this.viewOrder.address = "";
        this.viewOrder.amount = 0;
        this.viewOrder.name = "";
        this.viewOrder.phone = "";
        this.viewOrder.service = "";
        this.isButtonHidden = true;
        this.form.controls["name"].enable();
        this.form.controls["phone"].enable();
        this.form.controls["amount"].enable();
        this.form.controls["address"].enable();
        this.form.controls["service"].enable();
        this.form.patchValue(this.viewOrder);
    }

    onOrderFormSumit() {
        const formModel = this.form.value;
        this.order.clint_name = formModel.name;
        this.order.clint_phone = formModel.phone;
        this.order.clint_address = formModel.address;
        this.order.order_amount = formModel.amount;
        this.order.service_ID = +formModel.service;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.order.userId = this.user.Userid;
        this.orderservice.addOrder(this.order).subscribe(
            suc => {
                this.form = new FormGroup({
                    name: new FormControl('', Validators.required),
                    phone: new FormControl('', Validators.required),
                    amount: new FormControl('', Validators.required),
                    address: new FormControl('', Validators.required),
                    service: new FormControl('', Validators.required),
                })
                this.alert.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'New order has been generated, successfully!',
                });
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while generating new order!',
                    });
                }
            }
        );
    }

    clearFields() {
        this.form = new FormGroup({
            name: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.required),
            amount: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            service: new FormControl('', Validators.required),
        })
    }
}
