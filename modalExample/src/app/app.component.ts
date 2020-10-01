import { ModalmanagerService } from './services/modalmanager.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private mms: ModalmanagerService){

  }
  openModal()
  {
    this.mms.AddEdit("sdf")
  }
}
