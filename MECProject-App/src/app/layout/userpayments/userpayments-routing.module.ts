import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPaymentsComponent } from './userpayments.component';

const routes: Routes = [
    {
        path: '',
        component: UserPaymentsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserPaymentsRoutingModule {}