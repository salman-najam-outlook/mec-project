import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { BsComponentModule } from '../bs-component/bs-component.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [NgxPaginationModule, CommonModule, UsersRoutingModule, BsComponentModule, FormsModule, ReactiveFormsModule],
    declarations: [UsersComponent]
})
export class UsersModule { }
