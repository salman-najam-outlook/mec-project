import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsComponentModule } from '../bs-component/bs-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewOrderRoutingModule } from './neworder-routing.module';
import { NewOrderComponent } from './neworder.component';

@NgModule({
    imports: [NgxPaginationModule, CommonModule, NewOrderRoutingModule, BsComponentModule, FormsModule, ReactiveFormsModule],
    declarations: [NewOrderComponent]
})
export class NewOrderModule { }
