import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from '../../models/order.model';
import { OrderGrid } from '../../models/orderGrid';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ModalComponent, AlertComponent } from '../bs-component/components';
import { OrderService } from './order.service';
import { OrderView } from '../../models/order.model';
import { User } from '../../models/user.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    animations: [routerTransition()]
})

export class OrdersComponent implements OnInit {
    public isNewOrder: boolean;
    public isTrackingId: boolean;
    public orderStatus: string;
    public orderButton: string;
    public order: Order = new Order();
    public updateOrderId: number;
    public viewOrder: OrderView = new OrderView();
    public orderToDelete: OrderGrid;
    public printBtnShow : boolean = false;
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
            this.orderStatus = this.route.snapshot.paramMap.get('id');
            this.getOrders();
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
        this.isHidden = true;
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

    onOrderView(x: OrderGrid) {
        debugger;
        this.isHidden = true;
        this.printBtnShow = true;
        this.viewOrder.address = x.address;
        this.viewOrder.amount = x.order_amount;
        this.viewOrder.name = x.user_name;
        this.viewOrder.phone = x.phone;
        this.viewOrder.service = x.serviceId;
        this.isButtonHidden = false;
        this.viewOrder.trackingId = x.trackingId;
        this.viewOrder.shopkeeperName= x.shopkeeperName;
        this.form.patchValue(this.viewOrder);
        this.form.controls["service"].setValue(x.serviceId);
        this.form.controls["name"].disable();
        this.form.controls["phone"].disable();
        this.form.controls["amount"].disable();
        this.form.controls["address"].disable();
        this.form.controls["service"].disable();
        this.isNewOrder = false;
        this.isTrackingId = true;
    }

    onOrderEdit(x: OrderGrid) {
        this.isHidden = true;
        this.viewOrder.address = x.address;
        this.viewOrder.amount = x.order_amount;
        this.viewOrder.name = x.user_name;
        this.viewOrder.phone = x.phone;
        this.viewOrder.service = x.serviceId;
        this.viewOrder.trackingId = x.trackingId;
        this.isButtonHidden = true;
        this.orderButton = "Update Order";
        this.updateOrderId = x.order_ID;
        this.form.patchValue(this.viewOrder);
        this.form.controls["service"].setValue(x.serviceId);
        this.form.controls["name"].enable();
        this.form.controls["phone"].enable();
        this.form.controls["amount"].enable();
        this.form.controls["address"].enable();
        this.form.controls["service"].enable();
        this.isNewOrder = false;
        this.isTrackingId = true;
    }

    onCancleOrder() {
        this.isHidden = false;
        this.isNewOrder = true;
        this.isTrackingId = false;
    }

    onOrderFormSumit() {
        if (this.orderButton === "Confirm Order") {
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
                    this.isHidden = false;
                    this.isNewOrder = true;
                    this.isTrackingId = false;
                    this.getOrders();
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
        } else if (this.orderButton === "Update Order") {
            this.onUpdateOrderFormSumit();
        }
    }

    onUpdateOrderFormSumit() {
        const formModel = this.form.value;
        this.order.clint_name = formModel.name;
        this.order.clint_phone = formModel.phone;
        this.order.clint_address = formModel.address;
        this.order.order_amount = formModel.amount;
        this.order.service_ID = +formModel.service;
        this.order.order_ID = this.updateOrderId;
        this.orderservice.UpdateOrder(this.order).subscribe(
            suc => {
                this.getOrders();
                this.isHidden = false;
                this.isNewOrder = true;
                this.isTrackingId = false;
                this.alert.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'Order has been updated, successfully!',
                });
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while updating selected order!',
                    });
                }
            }
        );
    }

    onStatusChange(x, ob: OrderGrid) {
        ob.order_status = x;
        this.orderservice.updateOrderStatus(ob).subscribe(
            suc => {
                this.getOrders();
                this.alert.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'Order status has been updated, successfully!',
                });
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while updating order status!',
                    });
                }
            }
        );
    }

    getOrders() {
        var id = this.route.snapshot.paramMap.get('id');
        this.user = JSON.parse(localStorage.getItem('user'));
        this.orderservice.getAllOrders(id, this.user.Userid).subscribe(
            (response) => {
                this.orders = response;
                console.log(this.orders);
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while fetching orders!',
                    });
                }
            }
        )
    }

    openDeleteConfirmation(order: OrderGrid, content: any) {
        this.orderToDelete = order;
        this.modalHeader = "Delete Order";
        this.isDisabled = true;
        this.viewForm = content;
        this.modal.open(content);
    }

    deleteOrder(order: OrderGrid) {
        this.orderservice.deleteOrder(order).subscribe(
            (response) => {
                this.isHidden = false;
                this.isNewOrder = true;
                this.isTrackingId = false;
                this.getOrders();
                this.alert.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'Order has been deleted, successfully!',
                });
            },
            (errors) => {
                if (errors.status === 401) {
                    this.router.navigate(['login']);
                } else {
                    this.isHidden = false;
                    this.isNewOrder = true;
                    this.isTrackingId = false;
                    this.getOrders();
                    this.alert.alerts.push({
                        id: 1,
                        type: 'danger',
                        message: 'An error occured, while deleting order!',
                    });
                }
            }
        );
    }

    captureScreen()  
    {
        
  
      var data = document.getElementById('contentToConvert');  
      html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        var imgWidth = 208;   
        var pageHeight = 295;    
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
    
        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
        var position = 0;  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        pdf.save('MYPdf.pdf'); // Generated PDF   
      });  
    }
}
