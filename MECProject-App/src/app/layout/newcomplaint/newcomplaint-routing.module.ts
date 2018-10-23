import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComplaintComponent } from './newcomplaint.component';

const routes: Routes = [
    {
        path: '',
        component: NewComplaintComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewComplaintRoutingModule {}
