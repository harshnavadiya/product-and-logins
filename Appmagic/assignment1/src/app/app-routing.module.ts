import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ProductListManagementComponent } from './product-list-management/product-list-management.component';

import { DashManagementComponent } from './dash-management/dash-management.component';
import { ProductListManagementComponent } from './product-list-management/product-list-management.component';
import { LoginGuardGuard } from './login-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: DashManagementComponent,
    // canActivate: [LoginGuardGuard],
    children: [{
      path: '',
      component: ProductListManagementComponent
    }]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
