import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-global-navbar',
  templateUrl: './global-navbar.component.html',
  styleUrls: [ './global-navbar.component.css' ],
  animations: [
    trigger('navAnimationState', [
      state('start', style({
        transform: 'translateX(0) translateY(-100%)'
      })),
      state('end', style({
        transform: 'translateX(0) translateY(0)'
      })),
      transition('start => end', animate('600ms ease-in'))
    ])
  ]
})
export class GlobalNavbarComponent implements OnInit {
  show = true;

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      this.toggle();
    }, 1);
  }

  get getState(): String {
    return this.show ? 'start' : 'end';
  }

  toggle() {
    this.show = !this.show;
  }
}
