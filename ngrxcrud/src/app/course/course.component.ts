import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addCourse } from '../action/course.action';
import { cNameSe } from '../selector/course.selector';
interface courseInterface {
  cName: string, cDes?: string, cPrice: number, cOffer?: number, cId: string
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  public formData: FormGroup ;
  constructor(private store: Store<{ course: courseInterface }>, private fb: FormBuilder) {

  }

  ngOnInit(): void {
   this.formData = this.fb.group({
      cName: [''], cDes: [''], cPrice: [''], cOffer: [''], cId: [Math.random()]
    })
    this.store.select(cNameSe).subscribe((e) => {
      console.log(e);
    })
  }
  onSubmit(){
    this.xyz();
    console.log(this.formData.value)
    this.store.dispatch(addCourse(this.formData.value));
    this.store.select('course').subscribe((e) => {
      console.log(e);
    })
  }
  xyz(){

  }

}
