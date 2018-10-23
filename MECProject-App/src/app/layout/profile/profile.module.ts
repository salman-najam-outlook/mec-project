import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { BsComponentModule } from '../bs-component/bs-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    imports: [CommonModule, ProfileRoutingModule, BsComponentModule, FormsModule, ReactiveFormsModule],
    declarations: [ProfileComponent]
})
export class ProfileModule {}
