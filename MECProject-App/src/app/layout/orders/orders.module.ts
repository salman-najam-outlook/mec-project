import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { BsComponentModule } from '../bs-component/bs-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [NgxPaginationModule, CommonModule, OrdersRoutingModule, BsComponentModule,
         FormsModule, ReactiveFormsModule],
    declarations: [OrdersComponent]
})
export class OrdersModule { }
