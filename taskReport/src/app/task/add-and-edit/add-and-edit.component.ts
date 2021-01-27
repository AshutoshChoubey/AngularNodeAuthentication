import { GenericService } from './../../services/generic.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-and-edit',
  templateUrl: './add-and-edit.component.html',
  styleUrls: ['./add-and-edit.component.css']
})
export class AddAndEditComponent implements OnInit {

  public addmore: FormGroup;
  submitted: boolean;
  error: string;
  constructor(private _fb: FormBuilder, public dialogRef: MatDialogRef<AddAndEditComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any, private genericService: GenericService) { }

  ngOnInit() {
    console.log("_editData",this.editData)
    this.addmore = this._fb.group({
      title: [''],
      type: [''],
      descripition: [''],
      itemRows: this._fb.array([this.initItemRows()])
    });
  }
  get formArr() {
    return this.addmore.get('itemRows') as FormArray;
  }
  get f() {
		return this.addmore.controls;
	}

  initItemRows() {
    return this._fb.group({
      task: [''],
      timeRange: [''],
      status: [''],
      client: [''],
      assignTo: [''],
      qa: [''],
      test: [''],
      learn: [''],
      descripition: [''],
      suggestion: [''],
    });
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
    if (this.addmore.invalid) {
      return;
    }
    this.genericService.apiPost(this.addmore.value, 'task/add').subscribe(
      res => {
        console.log(res);
        this.dialogRef.close(res);
      },
      error => {
        this.error = 'Unable to connect server. Please try again after some time.';
      }
    );
    
  }
  
  addForm(addForm: any) {
    throw new Error('Method not implemented.');
  }
}
