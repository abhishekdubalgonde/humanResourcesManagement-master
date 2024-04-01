import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  credentials = {
    username: '',
    password: ''
  };

  private authenticationFailed = false;

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  public login() {
    this.authService
      .login(this.credentials)
      .subscribe(
        /* happy path */() => this.router.navigateByUrl('/'),
        /* error path */(err) => {
          this.authenticationFailed = true
        });
  }

  ngOnInit() {
  }
}

