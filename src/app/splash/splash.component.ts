import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: [ './splash.component.css' ],
  animations: [
    trigger ('splashAnimationState', [
      state('start', style({
        height: '30vw',
        width: '30vw'
      })),
      state('end', style({
        height: '6vw',
        width: '6vw'
      })),
      transition('start => end', animate('600ms ease-in'))
    ])
  ]
})
export class SplashComponent implements OnInit {
  show = true;

  constructor() {
  }

  ngOnInit() {
  }

  get getState(): String {
    return this.show ? 'start' : 'end';
  }

  toggle() {
    this.show = !this.show;
  }
}
