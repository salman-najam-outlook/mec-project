import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsComponentModule } from '../bs-component/bs-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintsRoutingModule } from './complaints-routing.module';
import { ComplaintsComponent } from './complaints.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [NgxPaginationModule, CommonModule, ComplaintsRoutingModule, BsComponentModule, FormsModule, ReactiveFormsModule],
    declarations: [ComplaintsComponent]
})
export class ComplaintsModule {}
