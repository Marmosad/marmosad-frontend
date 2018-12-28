import {Injectable} from '@angular/core';
import {SocketIoService} from '../../socket-io/socket-io.service';
import {PlayerDisplay} from '../../interfaces/playerDisplay';
import {WhiteCard} from '../../interfaces/white-card';
import {Score} from '../../interfaces/player';
import {Subject} from 'rxjs/Subject';
import {BlackCard} from '../../interfaces/black-card';

@Injectable()
export class DisplayService {
  // this service listens to display updates, and provides observables to the board components
  private display: PlayerDisplay;
  private scoreSubject = new Subject<Score[]>();
  private handSubject = new Subject<WhiteCard[]>();
  private submissionsSubject = new Subject<WhiteCard[]>();
  private blackCardSubject = new Subject<BlackCard>();
  private isJudge: boolean;

  constructor(private socketService: SocketIoService) {
    this.socketService.onDisplayUpdate().subscribe((display: PlayerDisplay) => {
      this.display = display;
      this.scoreSubject.next(display.score);
      this.handSubject.next(display.playerHand);
      this.submissionsSubject.next(display.submissions);
      this.blackCardSubject.next(display.blackCard);
      this.isJudge = (this.socketService.getSocketId() === this.display.currentJudge);
      console.log('display service got an update');
      console.log(display);
    });
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

  get getIsJudge(): boolean {
    return this.isJudge;
  }
}
