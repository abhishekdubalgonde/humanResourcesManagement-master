import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {}

    getUsers() {
      //return this.http.get('http://localhost:3000/users');
      return this.http.get('http://localhost:4201/api/accounts');
    }

    getData() {
      //return this.http.get('http://localhost:3000/data');
      return this.http.get('http://localhost:4201/api/accounts');
    }

}
