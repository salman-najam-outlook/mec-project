import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationRequestsComponent } from './registration-requests.component';

const routes: Routes = [
    {
        path: '',
        component: RegistrationRequestsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegistrationRequestsRoutingModule {}
