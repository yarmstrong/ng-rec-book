import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAuMElJYfLnW7S7Jo2JGXH31HCObrqll4E',
      authDomain: 'ng-xxx-test.firebaseapp.com'
    });
  }
}
