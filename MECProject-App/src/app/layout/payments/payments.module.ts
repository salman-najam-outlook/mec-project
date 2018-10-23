import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsComponentModule } from '../bs-component/bs-component.module';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [NgxPaginationModule, CommonModule, PaymentsRoutingModule, BsComponentModule, FormsModule, ReactiveFormsModule],
    declarations: [PaymentsComponent]
})
export class PaymentsModule { }
