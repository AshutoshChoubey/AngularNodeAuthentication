import { BeforeloginGuard } from './guard/beforelogin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
    { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [BeforeloginGuard]},
    { path: 'admin', loadChildren: () => import('./task/task.module').then(m => m.TaskModule), canActivate : [AuthGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
