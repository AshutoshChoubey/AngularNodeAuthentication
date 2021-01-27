import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { GenericService } from './../../services/generic.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  addForm: FormGroup;
  error: any;
  submitted: boolean;
  constructor(private fb: FormBuilder,private genericService: GenericService, private router: Router, private auth: AuthService) {
    this.addForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$')]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  get f() {
    return this.addForm.controls;
  }

  ngOnInit(): void {
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.genericService.apiPost(this.addForm.value, 'users/login').subscribe(
      res => {
        this.auth.setUserAndToken(res.token, res.user, true) ;
        this.auth.makeLogin();
       // console.log(res);
      },
      error => {
        this.error = 'Unable to connect server. Please try again after some time.';
      }
    );
  }

}
