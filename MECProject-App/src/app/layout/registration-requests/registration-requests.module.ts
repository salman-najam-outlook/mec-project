import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRequestsComponent } from './registration-requests.component';
import { RegistrationRequestsRoutingModule } from './registration-requests-routing.module';
import { BsComponentModule } from '../bs-component/bs-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [NgxPaginationModule, CommonModule, RegistrationRequestsRoutingModule, BsComponentModule, FormsModule, ReactiveFormsModule],
    declarations: [RegistrationRequestsComponent]
})
export class RegistrationRequestsModule { }
