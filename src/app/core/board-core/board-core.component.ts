import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SocketIoService } from '../../socket-io/socket-io.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Display } from '../../interfaces/display';
import { Message } from '../../interfaces/message';
import { DisplayService } from '../display-service/display-service.service';
import { timeout } from 'q';
import {Router} from '@angular/router';

@Component({
  selector: 'app-board-core',
  templateUrl: './board-core.component.html',
  styleUrls: ['./board-core.component.css'],
  animations: [
    trigger('boardAnimationState', [
      state('start', style({
        transform: 'translateX(0%) translateY(-170%)'
      })),
      state('end', style({
        transform: 'translateX(0%) translateY(0%)'
      })),
      transition('start => end', animate('400ms ease-in')),
    ])
  ]
})
export class BoardCoreComponent implements OnInit, OnDestroy {
  playerName: string;
  showName = true;
  hasName = false;
  showBoard = false;

  constructor(private socketService: SocketIoService, private router: Router) {
  }

  ngOnInit() {
    if (this.socketService.hasSocket) {
      console.log('hasSocket'); }
    if (this.socketService.hasSocket) {
      this.hasName = true;
      this.socketService.initSocket();
      setTimeout(() => {
        this.toggleBoard();
      }, 10);
    }
  }

  public setPlayerName(playerName: string): void {
    console.log('setPlayerName');
    setTimeout(() => {
      this.playerName = playerName;
      this.hasName = true;
      this.socketService.setPlayerName(playerName);
      this.socketService.initSocket();
    });
  }

  ngOnDestroy() {
    this.socketService.closeSocket();
  }

  get getBoardState(): String {
    return this.showBoard ? 'end' : 'start';
  }

  toggleBoard() {
    this.showBoard = !this.showBoard;
  }
}
