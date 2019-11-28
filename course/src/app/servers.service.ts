import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class ServerService {

  constructor(private http: HttpClient) { }

  // optional
  private httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });

  private baseURL = 'https://udemy-ng-http-3c8d2.firebaseio.com';
  private dataURL = this.baseURL + '/data.json';
  private appNameURL = this.baseURL + '/appName.json';


  storeServers(servers: any[]) {
    return this.http.put(this.dataURL, servers, { headers: this.httpOptions })
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getServers() {
    return this.http
      .get(this.dataURL, { headers: this.httpOptions })
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getAppName() {
    return this.http
      .get(this.appNameURL)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
