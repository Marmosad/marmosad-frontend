import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SocketIoService } from '../../socket-io/socket-io.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Display } from '../../interfaces/display';
import { Message } from '../../interfaces/message';
import { DisplayService } from '../display-service/display-service.service';
import { timeout } from 'q';

@Component({
  selector: 'app-board-core',
  templateUrl: './board-core.component.html',
  styleUrls: ['./board-core.component.css'],
  animations: [
    trigger('nameAnimationState', [
      state('start', style({
        transform: 'translateX(0%) translateY(180%)'
      })),
      state('end', style({
        transform: 'translateX(0%) translateY(0%)'
      })),
      transition('start => end', animate('500ms ease-in')),
      transition('end => start', animate('300ms ease-in'))
    ]),
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

  constructor(private socketService: SocketIoService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.toggleName();
    }, 1);
    if (this.socketService.hasSocket) {
      this.hasName = true;
      this.socketService.initSocket();
      setTimeout(() => {
        this.toggleBoard();
      }, 10);
    }
  }

  ngOnDestroy() {
    this.socketService.closeSocket();
  }

  public setPlayerName(playerName: string): void {
    console.log('setPlayerName');
    this.toggleName();
    setTimeout(() => {
      this.playerName = playerName;
      this.hasName = true;
      this.socketService.setPlayerName(playerName);
      this.socketService.initSocket();
      setTimeout(() => {
        this.toggleBoard();
      }, 10);
    }, 300);
  }

  get getNameState(): String {
    return this.showName ? 'start' : 'end';
  }

  private toggleName() {
    this.showName = !this.showName;
  }

  get getBoardState(): String {
    return this.showBoard ? 'end' : 'start';
  }

  private toggleBoard() {
    this.showBoard = !this.showBoard;
  }
}
