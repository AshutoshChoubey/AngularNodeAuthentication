import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GenericService } from './generic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angulartesting';
  // initForm1: FormGroup=new FormGroup({
  //   user: new FormControl("",[Validators.required,Validators.pattern("/^[a-z]{1}[a-z0-9_]{3,13}$/")]),
  //   pass: new FormControl("",[Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")])
  // });
  data: { status: number; data: any; };
  initForm: FormGroup=this.fb.group({
    user: ["",[Validators.required,Validators.pattern("/^[a-z]{1}[a-z0-9_]{3,13}$/")]],
    pass: ["",[Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$")]]
  });
  constructor(private g:GenericService, private fb: FormBuilder,){
    
  }
  
  ngOnInit(): void {
  }
  submit(){
    this.g.postData(this.initForm.value).subscribe((val)=>{
      this.data=val;
      console.log("🚀 ~ file: app.component.ts ~ line 28 ~ AppComponent ~ this.g.postData ~ this.data", this.data)
    })
    
  }
 
  sum(a,b,c){
    return a+b+c;
  }
 
}
