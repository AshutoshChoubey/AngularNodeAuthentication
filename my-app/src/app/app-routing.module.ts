import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
    { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    { path: 'admin', loadChildren: () => import('./product/product.module').then(m => m.ProductModule), canActivate : [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
