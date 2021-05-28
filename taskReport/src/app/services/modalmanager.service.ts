import { UpdateTaskComponent } from './../task/update-task/update-task.component';
import { AddAndEditComponent } from './../task/add-and-edit/add-and-edit.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TaskListComponent } from '../task/task-list/task-list.component';

@Injectable({
  providedIn: 'root'
})
export class ModalmanagerService {

  constructor(private dialog: MatDialog ) {}
  public AddEdit(data: any = []): Observable<any> {
		var dialogConfig = new MatDialogConfig();
		dialogConfig.panelClass = 'add-more-pop';
		dialogConfig.data = data;
		let dialogRef: MatDialogRef<AddAndEditComponent>;
		dialogRef = this.dialog.open(AddAndEditComponent, dialogConfig);
		return dialogRef.afterClosed();
	}
	public Edit(data: any = []): Observable<any> {
		var dialogConfig = new MatDialogConfig();
		dialogConfig.panelClass = 'add-more-pop';
		dialogConfig.data = data;
		let dialogRef: MatDialogRef<UpdateTaskComponent>;
		dialogRef = this.dialog.open(UpdateTaskComponent, dialogConfig);
		return dialogRef.afterClosed();
	}
	public taskListModal(data: any = []): Observable<any> {
		var dialogConfig = new MatDialogConfig();
		dialogConfig.panelClass = 'add-more-pop';
		dialogConfig.data = data;
		let dialogRef: MatDialogRef<TaskListComponent>;
		dialogRef = this.dialog.open(TaskListComponent, dialogConfig);
		return dialogRef.afterClosed();
	}
}
