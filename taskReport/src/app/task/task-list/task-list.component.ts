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
      var table =$('#jqueryDataTable').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            { extend: 'copyHtml5', footer: true ,title: 'Task Report'},
            { extend: 'excelHtml5', footer: true ,title: 'Task Report'},
            { extend: 'csvHtml5', footer: true,title: 'Task Report' },
            { extend: 'pdfHtml5', footer: true ,title: 'Task Report',orientation: 'landscape',pageSize:'A3'}
        ],
        initComplete: function () {
          // Apply the search
          this.api().columns().every( function () {
              var that = this;
    
              $( 'input', this.footer() ).on( 'keyup change clear', function () {
                  if ( that.search() !== this.value ) {
                      that
                          .search( this.value )
                          .draw();
                  }
              } );
          } );
      }
    } );
    $('#jqueryDataTable').on( 'click', 'tr', function () {
      if ( $(this).hasClass('selected') ) {
          $(this).removeClass('selected');
      }
      else {
          table.$('tr.selected').removeClass('selected');
          $(this).addClass('selected');
      }
  } );


    $('td.toggle-vis').on( 'click', function (e) {
        e.preventDefault();
 
        // Get the column API object
        var column = table.column( $(this).attr('data-column') );
 
        // Toggle the visibility
        column.visible( ! column.visible() );
    } );


      });
  }

}
