import { TaskListComponent } from './task-list/task-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path: '', component: TaskComponent, children: [
      { path: 'list', component: TaskListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
