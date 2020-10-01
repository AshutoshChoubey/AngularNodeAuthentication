import { LocalStoreService } from './local-store.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './../models/index';


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
