/**

 Sample: coenraadf-angular-ponyracer-master
 2016 - Become a ninja with Angular 2.pdf

 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserModel } from '../security/model/user.model';
import { UserService } from '../security/service/user.service';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  navbarCollapsed = true;

  user: UserModel;
  userEventsSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event) {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
