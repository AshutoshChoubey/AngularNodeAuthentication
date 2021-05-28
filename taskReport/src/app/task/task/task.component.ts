import { Router } from '@angular/router';
import { GenericService } from './../../services/generic.service';
import { ModalmanagerService } from './../../services/modalmanager.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckbox } from '@angular/material/checkbox';
import { tap } from 'rxjs/operators';

export interface PeriodicElement {
  _id: string,
  title: string
  type: string,
  descripition: string,
  status: string,
  createdDate: Date
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit ,AfterViewInit  {

  
  dataList: any[]; // data comming from database to show in the table
  moduleAPI: string = 'task/view';
  paginationSetup: any = { // pagination related setup in the table
    pageLimitOptions: [2, 5, 10],
    pageLimit: 25,
    pageOffset: 0,
    totalRecord: 0
  };
  mouseHit: any = {
    down: 0,
    up: 0
  };
  lastWay: string = '';
  selection = new SelectionModel<PeriodicElement>(true, []);
  selectedListData: any = [];
  selectedList: any = [];
  error: string;
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  displayedColumns: string[] = ['select','_id', 'title', 'type', 'descripition','status','createdDate','show'];
  mouseDownRowID: number;
  mouseUpRowID: number;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('masterCheckbox') masterCheckbox: MatCheckbox;
  colName: string;
  orderBy: any='asc';
  
 
  

  constructor(private mms: ModalmanagerService, private _snackBar: MatSnackBar,private genericService : GenericService , private router:Router) {

  }
  ngOnInit() {
      this.records();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if (typeof (this.paginator) != 'undefined' && typeof (this.paginator.page) != 'undefined') {
      this.paginator.page
        .pipe(
          tap(() => this.loadPage())
        )
        .subscribe();
    }
    console.log("this.sort",this.sort);
  }
  public records(pageOffset: number = this.paginationSetup.pageOffset, pageLimit: number = this.paginationSetup.pageLimit, colName: string = this.colName, orderBy = this.orderBy)
  {
    let url =  `${this.moduleAPI}?offset=${pageOffset}&limit=${pageLimit}&colSort=${colName}&order_by=${orderBy}&`;
    this.genericService.getAll(url).subscribe(
      data => {
       this.paginationSetup.totalRecord= data.tasklist.totalDocs
        this.dataList = data.tasklist.docs;
        this.prepareMatTable();
        this.setPreSelect();
      },
      error => {
        this.error = 'Unable to connect server. Please try again after some time.';
      }
    );
  }


 
  prepareMatTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataList);
  }
  
  

  // setSelectFirst() {
  //   console.log("this.dataSource.data[0]",this.dataSource.data[0])
  //   if (!this.selection.isSelected(this.dataSource.data[0])) {
  //     this.selection.clear();
  //     this.dataSource.data.forEach((value, key) => {
  //       this.selectedList = this.selectedList.filter((list) => list != value._id);
  //       this.selectedListData = this.selectedListData.filter((list) => list.id != value._id);
  //     });

  //     this.setSelect(this.dataSource.data[0], true);
  //   }
  //   else {
  //     this.selection.clear();
  //     this.dataSource.data.forEach((value, key) => {
  //       this.selectedList = this.selectedList.filter((list) => list != value._id);
  //       this.selectedListData = this.selectedListData.filter((list) => list.id != value._id);
  //     });
  //   }
  // }
  setSelect(row, isSelected?) {
	this.selection.toggle(row);
		if (this.selection.isSelected(row)) {
			this.selectedList.push(row._id);
			this.selectedListData.push(row);
		}
		else {
			this.selectedList = this.selectedList.filter((list) => list != row._id);
			this.selectedListData = this.selectedListData.filter((list) => list._id != row._id);
		}
	}
  setPreSelect() {
		this.dataSource.data.forEach((value, key) => {
			if (this.selectedList.includes(value._id)) {
				this.selection.select(value);
			}
		});
	}
// This method is used for the pagination
  sortData(event) {
    if (event.direction != "") {
      this.records(this.paginator.pageIndex, this.paginator.pageSize, event.active, event.direction);
    }
    console.log(event);
  }
  loadPage() {
    console.log("pagination", this.paginator);
    this.records(this.paginator.pageIndex, this.paginator.pageSize, this.colName, this.orderBy);
  }
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.dataSource.data.forEach((value, key) => {
        this.selectedList = this.selectedList.filter((list) => list != value._id);
        this.selectedListData = this.selectedListData.filter((list) => list._id != value._id);
      });
    }
    else {
      this.dataSource.data.forEach((value, key) => {
        this.selection.select(value);
        if (!this.selectedList.includes(value._id)) {
          this.selectedList.push(value._id);
          this.selectedListData.push(value);
        }
      });
    }
  }
  

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  openModal() {
    this.mms.AddEdit({ editData: this.selectedListData,selectedListId: this.selectedList }).subscribe(res => {
      if (res) {
        this.openSnackBar(res.msg, "Done");
        this.records();
        this.selection.clear();
    		this.selectedList = [];
    		this.selectedListData = [];
      }
     
    }
    );
  }
  delete()
  {
    this.genericService.apiPost(this.selectedList, 'task/delete').subscribe(
      res => {
        console.log(res);
        this.openSnackBar(res.msg, "Done");
        this.records();
        this.selection.clear();
    		this.selectedList = [];
    		this.selectedListData = [];
      },
      error => {
        this.error = 'Unable to connect server. Please try again after some time.';
      }
    );
  }
public showtaskDetailsModal (event)
{
  this.mms.taskListModal({ data: event }).subscribe(res => {
    if (res) {
      this.openSnackBar(res.msg, "Done");
    }
  }
  );
}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  


}
