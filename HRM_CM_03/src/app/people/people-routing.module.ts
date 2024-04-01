import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PeopleManagementComponent} from "./people-management.component";

const routes: Routes = [
  {
    path: '',
    component: PeopleManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
