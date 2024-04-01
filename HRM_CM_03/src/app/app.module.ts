import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationModule } from './shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MenuComponent} from "./menu/menu.component";
import {UserService} from "./security/service/user.service";
import {PeopleModule} from "./people/people.module";


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthenticationModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PeopleModule
  ],
  declarations: [
    AppComponent,
    MenuComponent
  ],
  providers: [UserService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
