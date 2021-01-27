import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddAndEditComponent } from '../add-and-edit/add-and-edit.component';

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
}
