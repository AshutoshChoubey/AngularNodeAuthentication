import { AuthService } from './../../services/auth.service';
import { GenericService } from './../../services/generic.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  addForm: FormGroup;
  submitted: boolean = false;
  apiObject : any = "users/register"
  error: string;
  
  constructor(private fb: FormBuilder, private gs : GenericService,private auth: AuthService,private router: Router) {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(3)]]
    }, {
      validator: ConfirmedValidator('password', 'password_confirmation')
    });
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }
  get f() {
    return this.addForm.controls;
  }

  ngOnInit(): void {
    console.log('here');
  }
  onSubmit(): void {
    this.gs.apiPost(this.addForm.value,this.apiObject).subscribe( 
      res => {
      alert(res.msg);
      if(res.success){
        this.router.navigateByUrl("login");
      }
     
    },  error => {
      this.error = 'Unable to connect server. Please try again after some time.';
    })
    this.submitted = true;
  }


}
