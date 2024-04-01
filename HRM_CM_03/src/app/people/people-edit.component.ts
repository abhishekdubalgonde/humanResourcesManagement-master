import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Person } from './person';
import { PeopleService } from './people.service';
import {ContentFilterPipe} from './content-filter.pipe'
import {PeopleViewDetailsModalComponent} from "./people-view-details-modal.component";

@Component({
  selector: 'people-edit',
  templateUrl: './people-edit.component.html'
  ,providers: [PeopleService]
})
export class PeopleEditComponent implements OnInit{
  @Output() onAdded = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  errorMessage: string = '';

  public person:Person = new Person();

  constructor(private peopleService : PeopleService){ }

  addPerson() {

    this.peopleService
      .saveOrUpdate(this.person)
      .subscribe(
           // (p: Response) => {console.log('success');}

           /* happy path */ p => {
                                //this.people = p;
                                console.log('success');
                                this.onAdded.emit(null);
                              },
          /* error path */ e => this.errorMessage = e
          ///* onComplete */ () => this.isLoading = false);

         );
    //this.onAdded.emit(null);
  }

  cancel() {
    this.onCancel.emit(null);
  }

  ngOnInit(){}
}
