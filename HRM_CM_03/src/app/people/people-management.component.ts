import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Person} from './person';
import {PeopleService} from './people.service';
import {ContentFilterPipe} from './content-filter.pipe'
import {PeopleViewDetailsModalComponent} from "./people-view-details-modal.component";
import {PeopleListComponent} from "./people-list.component";

@Component({
  selector: 'people-management',
  templateUrl: './people-management.component.html'
  , providers: [PeopleService, ContentFilterPipe, PeopleListComponent]
})
export class PeopleManagementComponent implements OnInit {

  private currentView: string = 'list';

  @Output() onGoToAdd = new EventEmitter();

  constructor() {
  }


  navigateTo(view: string) {
    this.currentView = view;
  }

  public goToAdd() {
    this.currentView = "add";
    this.onGoToAdd.emit(null);
  }

  ngOnInit() {

  }

}
