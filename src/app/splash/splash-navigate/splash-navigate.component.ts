import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-splash-navigate',
  templateUrl: './splash-navigate.component.html',
  styleUrls: ['./splash-navigate.component.css'],
  animations: [
    trigger('splashButtonsAnimationState', [
      state('start', style({
        transform: 'translateX(-50%) translateY(-100%)'
      })),
      state('end', style({
        transform: 'translateX(-200%) translateY(-100%)'
      })),
      transition('start => end', animate('500ms ease-in'))
    ])
  ]
})
export class SplashNavigateComponent implements OnInit {
  private show = true;

  @Output() routeOut: EventEmitter<any> = new EventEmitter();
  @Output() stopEnter: EventEmitter<any> = new EventEmitter();

  toCore(): void {
    this.animate(this.route, 'core');
  }

  // TODO
  toAbout(): void {
    this.animate(this.route, 'about');
  }

  private animate = (callRoute, to): void => {
    if (to === 'core') {
      console.log('redirecting to core');
      this.routeOut.emit(null);
      this.toggle();
      setTimeout(() => {
        callRoute();
      }, 500);
    } else {
      window.location.replace('https://github.com/Marmosad');
    }
  };

  private route = (): void => {
    this.router.navigate(['/core']);
  };

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
