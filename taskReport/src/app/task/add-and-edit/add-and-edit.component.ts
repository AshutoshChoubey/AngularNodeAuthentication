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
    if ((this.editData) && (this.editData.selectedListId.length > 1))
    {
      this.addmore = this._fb.group({
        type: [''],
        descripition: [''],
      });
    }
    else{
      this.addmore = this._fb.group({
        title: [''],
        type: [''],
        descripition: [''],
        itemRows: this._fb.array([this.initItemRows()])
      });
    }

    if (this.editData.selectedListId.length == 1)
    {
      this.deleteRow(0);
      console.log(this.editData.editData)
      this.addmore.patchValue({title:this.editData.editData[0].title,type:this.editData.editData[0].type,descripition:this.editData.editData[0].descripition});

      for (var j = 0; j < this.editData.editData[0].tasklist.length; j++) {
        const patchDynamically = this.addmore.get('itemRows') as FormArray;
        patchDynamically.push(this._fb.group({
          task: [this.editData.editData[0].tasklist[j].task],
          timeRange: [this.editData.editData[0].tasklist[j].timeRange],
          status: [this.editData.editData[0].tasklist[j].status],
          client: [this.editData.editData[0].tasklist[j].client],
          assignTo: [this.editData.editData[0].tasklist[j].assignTo],
          qa: [this.editData.editData[0].tasklist[j].qa],
          test: [this.editData.editData[0].tasklist[j].test],
          learn: [this.editData.editData[0].tasklist[j].learn],
          descripition: [this.editData.editData[0].tasklist[j].descripition],
          suggestion: [this.editData.editData[0].tasklist[j].suggestion],
        }));
      }

    }
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
    
    if (this.editData.selectedListId.length >0){
      let data = {formData:this.addmore.value, editdata: this.editData}
      this.genericService.apiPost(data, 'task/update').subscribe(
        res => {
          console.log(res);
          this.dialogRef.close(res);
        },
        error => {
          this.error = 'Unable to connect server. Please try again after some time.';
        }
      );
    }
    else
    {
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
    
    
  }
  
  addForm(addForm: any) {
    throw new Error('Method not implemented.');
  }
}
