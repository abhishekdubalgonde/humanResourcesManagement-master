import { Injectable } from '@angular/core';
import { HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Person } from './person';

import { environment } from '../environments/environment';
import {HttpClient} from "@angular/common/http";
import {AccountsResponse} from "./AccountsResponse";

@Injectable()
export class PeopleService{
  //private baseUrl: string = 'http://swapi.co/api';
  //private baseUrl: string = 'http://localhost:4200/api';
  //private baseUrl: string = environment.backend.baseURL;
  //private baseUrl: string = '/api';

  /*constructor(private http: HttpService){
  }*/

  baseUrl: string = environment.backend.baseURL;

  constructor(private http: HttpClient){
  }

  getAll(): Observable<AccountsResponse>{
    /*let people$ = this.http.get('/accounts')
      .map(mapPersons)
      .catch(handleError);
      return people$;*/

    return this.http.get<AccountsResponse>(`${this.baseUrl}` + '/accounts');
  }

  /*
  get(id: number): Observable<Person> {
    let person$  = this.http
      .get(`/users/${id}`)
      .map(mapPerson)
      .catch(handleError);

    //let arrayPersons = <Array<Person>>person$;

    //<Array<number>>x

      //if(Array.isArray(person$) && Array.length(person$)>0){

     // }
      //return person$[0];
    return person$;
  }
*/
  saveOrUpdate(person: Person) : Observable<Response>{
    // this won't actually work because the StarWars API doesn't
    // is read-only. But it would look like this:

    console.log(JSON.stringify(person));

    if(person.id){
      return this.http
        .put(`/users/`, JSON.stringify(person))
        //.map(mapPersons)
        .catch(handleError);
    }
    return this.http
      .post(`/users/`, JSON.stringify(person))
   //   .map(mapPersons)
      .catch(handleError);

  }


}

/*
function mapPersons(response:Response): Person[]{
   // uncomment to simulate error:
   // throw new Error('ups! Force choke!');

   // The response of the API has a results
   // property with the actual results

  //return response.json().results.map(toPerson);
  return response.json().content.map(toPerson);
}
*/

/*
function mapPerson(response:Response): Person{
  // toPerson looks just like in the previous example
 // return toPerson(response.results.json());

  let persons:Array<Person> = mapPersons(response);//.json().results.map(toPerson);

  if(persons && persons.length===1){
    return persons[0];
  }else{
    return null;
  }


 //return response.json().results(toPerson);
}*/

/*
function toPerson(r:any): Person{
  let person = <Person>( {
    //id: extractId(r),
    id:r.id
    //,url: r.url,
    ,name: r.name
    //,address: r.address,
    //,height: r.height
  });
  console.log('Parsed person:', person);
  return person;
}
*/
// to avoid breaking the rest of our app
// I extract the id from the person url
/*function extractId(personData:any){
  let extractedId = personData.url.replace('http://swapi.co/api/people/','').replace('/','');
  return parseInt(extractedId);
}*/



// this could also be a private method of the component class
function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
