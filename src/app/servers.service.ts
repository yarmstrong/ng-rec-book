import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServersService {
  constructor(private http: Http) {}
  storeServers(servers: any[]) {
    const headers = new Headers({'Content-Type': 'application/json'});
    // return this.http.post('https://ng-http-test-83714.firebaseio.com/data.json',
    return this.http.put('https://ng-http-test-83714.firebaseio.com/data.json',
      servers,
      {headers: headers});
  }
  getServers() {
    return this.http.get('https://ng-http-test-83714.firebaseio.com/data')
      .map(
        (response: Response) => {
          const data = response.json();
          for (const server of data) {
            server.name = 'Fetched_' + server.name;
          }
          return data;
          /**
           * map operator will take this returned data (whatever it is)
           * and wrap it into an observable again, but now with the transformed data
           */
        }
      )
      .catch(
        (error: Response) => {
          console.log(error); // original error
          return Observable.throw('Something went wrong...'); // customized error message
        }
      );
  }
  getAppName() {
    return this.http.get('https://ng-http-test-83714.firebaseio.com/appName.json')
      .map(
        (response: Response) => {
          console.log('getAppName called');
          return response.json();
        }
      );
  }
}