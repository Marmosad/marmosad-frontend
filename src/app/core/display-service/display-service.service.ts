import { Injectable, OnInit } from '@angular/core';
import { SocketIoService } from '../../socket-io/socket-io.service';
import { Display } from '../../interfaces/display';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../interfaces/message';
import { WhiteCard } from '../../interfaces/white-card';
import { Player } from '../../interfaces/player';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { BlackCard } from '../../interfaces/black-card';

@Injectable()
export class DisplayService {
  // this service listens to display updates, and provides observables to the board components
  private display: Display;
  private scoreSubject = new Subject<Player[]>();
  private handSubject = new Subject<WhiteCard[]>();
  private submissionsSubject = new Subject<WhiteCard[]>();
  private blackCardSubject = new Subject<BlackCard>();

  constructor(private socketService: SocketIoService) {
    this.socketService.onDisplayUpdate().subscribe((display: Display) => {
      this.display = display;
      this.scoreSubject.next(display.players);
      this.handSubject.next(this.getHand(display.players, this.socketService.socketId));
      this.submissionsSubject.next(display.submissions);
      this.blackCardSubject.next(display.blackCard);
      console.log('display service got an update');
      console.log(display);
    });
  }

  getHand(players: Player[], id: string): WhiteCard[] {
    return players[
      players.findIndex(function (elem: Player): boolean {
          return (elem.playerId === id);
        }
      )].hand;
  }

  get getScoreSubject() {
    return this.scoreSubject;
  }

  get getHandSubject() {
    return this.handSubject;
  }

  get getSubmissionsSubject() {
    return this.submissionsSubject;
  }

  get getBlackCardSubject() {
    return this.blackCardSubject;
  }

  get getDisplay() {
    return this.display;
  }

}
