import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ServerService {

  constructor(private http: HttpClient) { }

  url = 'https://udemy-ng-http-3c8d2.firebaseio.com/data.json';

  storeServers(servers: any[]) {
    return this.http.post(this.url, servers);
  }
}
