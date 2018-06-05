import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
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
  styleUrls: ['./splash.component.css'],
  animations: [
    trigger('splashAnimationState', [
      state('start', style({
        transform: 'translateX(-50%) translateY(-50%)'
      })),
      state('end', style({
        transform: 'translateX(100%) translateY(-50%)'
      })),
      transition('start => end', animate('500ms ease-in'))
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
