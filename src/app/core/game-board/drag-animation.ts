import { animate, state, style, transition, trigger } from '@angular/animations';

export const dragAnimation = trigger('dragState', [
  state('up', style({
    opacity: '0.5',
    transform: 'scale(0.7)'
  })),
  state('down', style({
    opacity: '1',
    transform: 'scale(1)'
  })),
  transition('down => up', animate('50ms ease-in')),
  transition('up => down', animate('100ms ease-in')),
]);
