import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsComponentModule } from '../bs-component/bs-component.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserPaymentsRoutingModule } from './userpayments-routing.module';
import { UserPaymentsComponent } from './userpayments.component';

@NgModule({
    imports: [NgxPaginationModule, CommonModule, UserPaymentsRoutingModule, BsComponentModule, FormsModule, ReactiveFormsModule],
    declarations: [UserPaymentsComponent]
})

export class UserPaymentsModule { }
