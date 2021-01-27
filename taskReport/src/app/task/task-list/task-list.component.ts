import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare const $;

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  showPassedData: any;

  constructor(public dialogRef: MatDialogRef<TaskListComponent>,
    @Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit(): void {
    console.log("_editData",this.passedData)
    this.showPassedData=this.passedData.data;
    this.jqueryDataTable();
  }
  public jqueryDataTable()
  {
     $(function(){
    $('#jqueryDataTable').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            { extend: 'copyHtml5', footer: true ,title: 'Product Purchase Report'},
            { extend: 'excelHtml5', footer: true ,title: 'Product Purchase Report'},
            { extend: 'csvHtml5', footer: true,title: 'Product Purchase Report' },
            { extend: 'pdfHtml5', footer: true ,title: 'Product Purchase Report',orientation: 'landscape',pageSize:'A3'}
        ]
    } );

      });
  }

}
