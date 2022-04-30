import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GenericService } from './generic.service';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angulartesting';
  passwithinput = { learn: 'angular', website: 'worldgyan.com' };
  initForm: FormGroup;
  data: { status: number; data: any };
  constructor(
    private fb: FormBuilder,
    private genericService: GenericService,
    private api: ApiService
  ) {}
  ngOnInit(): void {
    // this.initForm= new FormGroup({
    //   user:new FormControl("",[Validators.required,Validators.pattern("^[a-zA-Z0-9-_]{3,13}$")]),
    //   pass:new FormControl("",[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&].{4,15})$")])
    // })
    this.initForm = this.fb.group({
      user: [
        '',
        [Validators.required, Validators.pattern('^[a-z]{1}[a-z0-9_]{3,13}$')],
      ],
      pass: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
          ),
        ],
      ],
    });
  }
  submit() {
    if (this.initForm.valid) {
      let user = this.initForm.get('user').value;
      let pass = this.initForm.get('pass').value;
      this.api.postData(user, pass).subscribe((val) => {
        this.data = val;
      });
    }
  }
}
