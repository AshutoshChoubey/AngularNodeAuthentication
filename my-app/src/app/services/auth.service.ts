import { LocalStoreService } from './local-store.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './../models/index';

// ================= only for demo purpose ===========
// const DEMO_TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhkNDc4MDc4NmM3MjE3MjBkYzU1NzMiLCJlbWFpbCI6InJhZmkuYm9ncmFAZ21haWwuY29tIiwicm9sZSI6IlNBIiwiYWN0aXZlIjp0cnVlLCJpYXQiOjE1ODc3MTc2NTgsImV4cCI6MTU4ODMyMjQ1OH0.dXw0ySun5ex98dOzTEk0lkmXJvxg3Qgz4ed";

// const DEMO_USER:  User={
//   "id": 1,
//         "fname": "dWx0cmE=",
//         "lname": "dXNlcg==",
//         "email": "ultra@innovativedatasolutions.in",
//         "mobile": "",
//         "pan": "",
//         "aadhar": "",
//         "dob": "30-11--1",
//         "status": 1,
//         "created_by": 1,
//         "created_on": "2020-09-09 02:31:24",
//         "modified_by": 1,
//         "modified_on": null
// };
// // ================= you will get those data from server =======


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token;
  isAuthenticated: Boolean;
  user: User;
  user$ = (new BehaviorSubject<User>(this.ls.getItem("user")));
  signingIn: Boolean;
  return: string;
  jwtToken = "token";
  appUser = "user";
  isLogging = "isLogging"

  constructor(
    private ls: LocalStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  public makeLogin() {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl("admin");
    }

  }

  public signout() {
    this.setUserAndToken(null, null, false);
    this.router.navigateByUrl("login");
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.jwtToken);
  }
  getUser() {
    return this.ls.getItem(this.appUser);
  }

  setUserAndToken(token: String, user: User, isAuthenticated: Boolean) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.user = user;
    this.user$.next(user);
    this.ls.setItem(this.jwtToken, token);
    this.ls.setItem(this.appUser, user);
    this.ls.setItem(this.isLogging, isAuthenticated);
  }

}
