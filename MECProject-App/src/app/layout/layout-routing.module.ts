import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]  },
            { path: 'registration-requests', loadChildren: './registration-requests/registration-requests.module#RegistrationRequestsModule', canActivate: [AuthGuard] },
            { path: 'orders/:id', loadChildren: './orders/orders.module#OrdersModule', canActivate: [AuthGuard] },
            { path: 'complaints/:id', loadChildren: './complaints/complaints.module#ComplaintsModule', canActivate: [AuthGuard] },
            { path: 'payments/:id', loadChildren: './payments/payments.module#PaymentsModule', canActivate: [AuthGuard] },
            { path: 'users', loadChildren: './users/users.module#UsersModule', canActivate: [AuthGuard] },
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
            { path: 'neworder', loadChildren: './neworder/neworder.module#NewOrderModule', canActivate: [AuthGuard] },
            { path: 'newcomplaint', loadChildren: './newcomplaint/newcomplaint.module#NewComplaintModule', canActivate: [AuthGuard] },
            { path: 'userpayments', loadChildren: './userpayments/userpayments.module#UserPaymentsModule', canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
