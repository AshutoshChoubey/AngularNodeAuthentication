import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdListComponent } from './prod-list/prod-list.component';
import { AuthGuard } from './../guard/auth.guard';
import { ProductHomeComponent } from './product-home/product-home.component';

const routes: Routes = [
  { path : '', component: ProductHomeComponent},
  { path : 'product-list', component: ProdListComponent, canActivate : [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
