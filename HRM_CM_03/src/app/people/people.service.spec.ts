/*import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('VideoService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: VIMEO_API_URL, useValue: 'http://example.com' },
        VideoService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });

  });
})
*/
//import { GithubService } from './github.service';


/**
 * https://blog.craftlab.hu/testing-http-requests-in-angular-has-never-been-easier-dfe53c267522
 * http://jasonwatmore.com/post/2017/12/15/angular-5-mock-backend-example-for-backendless-development
 * https://keyholesoftware.com/2016/05/16/test-driven-intro-angular2/
 */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {PeopleService} from "./people.service";
import {environment} from "../environments/environment";

describe('PeopleService', () => {

  const baseUrl: string = environment.backend.baseURL;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeopleService]
    });
  });

  it('should get users account', () => {
    // const profileInfo = { login: 'blacksonic', id: 602571, name: 'Gábor Soós' };
    const profileInfo = {"content":[{"id":1,"name":"defaultUser"}],"last":true,"totalElements":1,"totalPages":1,"sort":null,"first":true,"numberOfElements":1,"size":20,"number":0}
    const peopleService = TestBed.get(PeopleService);
    const http = TestBed.get(HttpTestingController);
    let profileResponse;

    peopleService.getAll().subscribe((response) => {
      profileResponse = response;
    });


    http.expectOne(`${baseUrl}` + '/accounts').flush(profileInfo);
    expect(profileResponse).toEqual(profileInfo);


  });
});


