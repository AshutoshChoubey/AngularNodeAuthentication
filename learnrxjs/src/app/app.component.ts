import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map,filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {

  }
  ngOnInit() {
    var newObservable1 = new Observable((subscriber) => {
      subscriber.next([2, 3, 4]);
      subscriber.next(3);
      subscriber.next(4);
      setTimeout(() => subscriber.next(20), 2000)
    });
    var newObservable = newObservable1.pipe(
      map((data) => {
        if (typeof (data) == 'number') {
          console.log("map data",data)
          return data * 5
        }
      }),
      filter(x => x>40)
      );

    newObservable.subscribe((data) => {
      console.log(data);
    },
      error => { console.log(error) },

    );
  //  console.log(newObservable.);

  }
}

