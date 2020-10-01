import { AddFileComponent } from './../add-file/add-file.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalmanagerService {

  constructor(private dialog: MatDialog ) {}
  public AddEdit(data: any = []): Observable<any> {
		var dialogConfig = new MatDialogConfig();
		dialogConfig.panelClass = 'add-more-pop';
		dialogConfig.data = data;
		let dialogRef: MatDialogRef<AddFileComponent>;
		dialogRef = this.dialog.open(AddFileComponent, dialogConfig);
		return dialogRef.afterClosed();
	}

}
