import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsComponentModule } from '../bs-component/bs-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewComplaintRoutingModule } from './newcomplaint-routing.module';
import { NewComplaintComponent } from './newcomplaint.component';

@NgModule({
    imports: [NgxPaginationModule, CommonModule, NewComplaintRoutingModule, BsComponentModule, FormsModule, ReactiveFormsModule],
    declarations: [NewComplaintComponent]
})
export class NewComplaintModule { }
