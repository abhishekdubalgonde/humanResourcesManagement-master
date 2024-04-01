import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Person } from './person';
import { PeopleService } from './people.service';
import {ContentFilterPipe} from './content-filter.pipe'
import {PeopleViewDetailsModalComponent} from "./people-view-details-modal.component";

@Component({
  selector: 'people-list',
  templateUrl: './people-list.component.html',
  providers: [PeopleService,ContentFilterPipe,PeopleViewDetailsModalComponent]
})
export class PeopleListComponent implements OnInit{
  private _index = 0;
  people: Person[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  @Output() onView = new EventEmitter<Person>();

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    /*
    https://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit
    Mostly we use ngOnInit for all the initialization/declaration and avoid stuff to work in the constructor.
    The constructor should only be used to initialize class members but shouldn't do actual "work".
    So you should use constructor() to setup Dependency Injection and not much else.
    ngOnInit() is better place to "start" - it's where/when components' bindings are resolved.
    */
    this.peopleService
      .getAll()
      .subscribe(
         /* happy path */ p => this.people = p.content,
         /* error path */ e => this.errorMessage = e,
         /* onComplete */ () => this.isLoading = false);
  }


  public viewPerson(person: Person) {
    this.onView.emit(person);
  }

  /*public enableAdd() {
    return this._index < this.people.length;
  }
  public addUser() {
    if (this.enableAdd()) {
      this.people.push(this.people[this._index++]);
    }
  }
  public clearUsers() {
    //this.people = [];
    this._index = 0;
  }*/
}
