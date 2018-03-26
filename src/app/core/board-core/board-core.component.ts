import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../socket-io/socket-io.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-board-core',
  templateUrl: './board-core.component.html',
  styleUrls: ['./board-core.component.css'],
  animations: [
    trigger('nameAnimationState', [
      state('start', style({
        transform: 'translateX(0%) translateY(150%)'
      })),
      state('end', style({
        transform: 'translateX(0%) translateY(-0%)'
      })),
      transition('start => end', animate('600ms ease-in'))
    ])
  ]
})
export class BoardCoreComponent implements OnInit {
  playerName: string;
  hasName: boolean;
  show = true;

  constructor(private socketService: SocketIoService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.toggle();
    }, 1);
  }

  setPlayerName = (playerName: string): void => {
    this.playerName = playerName;
    this.hasName = true;
    this.socketService.setPlayerName(playerName);
  }

  get getState(): String {
    return this.show ? 'start' : 'end';
  }

  toggle() {
    this.show = !this.show;
  }
}
