import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-splash-navigate',
  templateUrl: './splash-navigate.component.html',
  styleUrls: [ './splash-navigate.component.css' ],
  animations: [
    trigger('splashButtonsAnimationState', [
      state('start', style({
        transform: 'translateX(-50%) translateY(-100%)'
      })),
      state('end', style({
        transform: 'translateX(-200%) translateY(-100%)'
      })),
      transition('start => end', animate('600ms ease-in'))
    ])
  ]
})
export class SplashNavigateComponent implements OnInit {
  show = true;

  @Output() routeOut: EventEmitter<any> = new EventEmitter();

  toCore(): void {
    this.animate(this.route);
  }

  animate = (callRoute): void => {
    console.log('redirecting to core');
    this.routeOut.emit(null);
    this.toggle();
    setTimeout(() => {
      callRoute();
    }, 600);
  }
  route = (): void => {
    this.router.navigate([ '/core' ]);
  }
  constructor(private router: Router) {
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
