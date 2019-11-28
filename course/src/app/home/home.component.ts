import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  message: string;
  counter: number;

  myNumbersObservableSubscription: Subscription;
  myObservableSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // const myNumbers = Observable.interval(2);
    const myNumbers = interval(1000);

    this.myNumbersObservableSubscription = myNumbers.subscribe(
      (nmb: number) => {
        this.counter = nmb;
      }
    );

    // fire after 2, 4 seconds and fail after 5 seconds
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      // setTimeout(() => {
      //   observer.error('observer failed.');
      // }, 6000);
      setTimeout(() => {
        observer.complete();
      }, 6000);
    });

    this.myObservableSubscription = myObservable.subscribe(
      (data: string) => { this.message = data; },
      (error: string) => { this.message = 'ERROR: ' + error; },
      () => { this.message = 'Completed'; }
    );

  }

  ngOnDestroy(): void {
    this.myNumbersObservableSubscription.unsubscribe();
    this.myObservableSubscription.unsubscribe();
  }

}
