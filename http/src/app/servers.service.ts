import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry, catchError } from 'rxjs/operators';
import { ServerDTO } from './ServerDTO';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class ServerService {

  constructor(private http: HttpClient) { }

  // optional
  private httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });

  private url = 'https://udemy-ng-http-3c8d2.firebaseio.com/data.json';

  storeServers(servers: any[]) {
    return this.http.post(this.url, servers, { headers: this.httpOptions });
  }

  getServers(): Observable<ServerDTO> {
    return this.http
      .get<ServerDTO>(this.url)
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
