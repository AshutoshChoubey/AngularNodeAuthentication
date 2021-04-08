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
  
 
  

  constructor(private mms: ModalmanagerService, private _snackBar: MatSnackBar,private genericService : GenericService) {

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
      },
      error => {
        this.error = 'Unable to connect server. Please try again after some time.';
      }
    );
  }


  // related to datatable
  setSelectMD(i: number) {
    this.mouseDownRowID = i;
    this.mouseHit = {
      down: 0,
      up: 0
    };
    this.lastWay = '';
  }

  setSelectMU(i: number) {
    this.mouseUpRowID = i;
    this.setSelectMouse();
  }
  prepareMatTable() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataList);
  }
  setSelectMouse(isSelect: boolean = true) {
    if ((this.mouseDownRowID || this.mouseDownRowID >= 0) && (this.mouseUpRowID || this.mouseUpRowID >= 0) && this.mouseDownRowID != this.mouseUpRowID) {
      let startRow: number;
      let endRow: number;
      let i: number;
      if (this.mouseDownRowID >= this.mouseUpRowID) {
        endRow = this.mouseDownRowID;
        startRow = this.mouseUpRowID;
      }
      else {
        startRow = this.mouseDownRowID;
        endRow = this.mouseUpRowID;
      }
      for (i = startRow; i <= endRow; i++) {
        if (typeof (this.dataSource.data[i]) != 'undefined') {
          this.setSelect(this.dataSource.data[i], isSelect);
        }
      }
    }
  }
  setSelectShift(way: string) {
    if (this.mouseUpRowID || this.mouseUpRowID >= 0) {
      if (way == 'up' && (this.mouseHit.up >= 1 || this.mouseDownRowID > 0)) {
        if (this.mouseHit.up >= 1) {
          this.mouseDownRowID = this.mouseHit.up - 1;
        }
        else {
          if (this.mouseDownRowID > this.mouseUpRowID) {
            this.mouseDownRowID = this.mouseUpRowID - 1;
          }
          else {
            this.mouseDownRowID = this.mouseDownRowID - 1;
          }
        }
        this.mouseHit.up = this.mouseDownRowID;
      }
      else if (way == 'down') {
        if (this.mouseHit.down > 0) {
          this.mouseDownRowID = this.mouseHit.down + 1;
        }
        else {
          if (this.mouseDownRowID < this.mouseUpRowID) {
            this.mouseDownRowID = this.mouseUpRowID + 1;
          }
          else {
            this.mouseDownRowID = this.mouseDownRowID + 1;
          }
        }
        this.mouseHit.down = this.mouseDownRowID;
      }
      if (typeof (this.dataSource.data[this.mouseDownRowID]) != 'undefined') {
        this.setSelectMouse();
      }
    }
  }

  setSelectFirst() {
    if (!this.selection.isSelected(this.dataSource.data[0])) {
      this.selection.clear();
      this.dataSource.data.forEach((value, key) => {
        this.selectedList = this.selectedList.filter((list) => list != value._id);
        this.selectedListData = this.selectedListData.filter((list) => list.id != value._id);
      });
      this.setSelectMD(0);
      this.mouseUpRowID = 0;
      this.setSelect(this.dataSource.data[0], true);
    }
    else {
      this.selection.clear();
      this.dataSource.data.forEach((value, key) => {
        this.selectedList = this.selectedList.filter((list) => list != value._id);
        this.selectedListData = this.selectedListData.filter((list) => list.id != value._id);
      });
    }
  }
  setSelect(row, isSelected?) {
    if (isSelected) {
      this.selection.select(row);
    }
    else {
      this.selection.toggle(row);
    }
    this.selectedList = this.selectedList.filter((list) => list != row._id);
    this.selectedListData = this.selectedListData.filter((list) => list.id != row._id);
    if (this.selection.isSelected(row)) {
      this.selectedList.push(row._id);
      this.selectedListData.push(row);
    }
    if (this.selectedList.length) {
     // this.edit();
    }
    else {
      //this.openSidebar = false;
    }
    return true;
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


  setSelectClick(row, event) {
		if (typeof (event.shiftKey) != 'undefined' && event.shiftKey) {
			this.setSelect(row);
		}
		else {
			if (this.selection.isSelected(row)) {
				this.setSelect(row, false);
			}
			else {
				this.selection.clear();
				this.dataSource.data.forEach((value, key) => {
					this.selectedList = this.selectedList.filter((list) => list != value._id);
					this.selectedListData = this.selectedListData.filter((list) => list.id != value._id);
				});
				this.setSelect(row);
			}
		}
  }
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.dataSource.data.forEach((value, key) => {
        this.selectedList = this.selectedList.filter((list) => list != value._id);
        this.selectedListData = this.selectedListData.filter((list) => list.id != value._id);
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
    this.mms.AddEdit({ text: "passing data from parant component" }).subscribe(res => {
      if (res) {
        this.openSnackBar(res.msg, "Done");
      }
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
