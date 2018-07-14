import {Component, OnDestroy, OnInit, Inject, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { SocketIoService } from '../../socket-io/socket-io.service';
import {Router} from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SimpleModalComponent } from '../../common/simple-modal/simple-modal.component';
import { Board } from '../../interfaces/board';
import { BoardService } from '../board.service';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
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
    ])]
})
export class LobbyComponent implements OnInit {

  private showName = true;
  playerName: string;
  hasName = false;
  inputValue = '';

  selectedBoard: Board;
  boards = new Array<Board>();

  @ViewChild('popup') playerLimitWarning: SimpleModalComponent;

  private toggleName() {
    this.showName = !this.showName;
  }

  constructor(
    private socketService: SocketIoService,
    private router: Router,
    private boardService: BoardService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.toggleName();
    }, 1);
    this.setBoards();
  }

  get getNameState(): String {
    return this.showName ? 'start' : 'end';
  }

  public enterGame(playerName: string): void {
      this.chooseName(this.playerName);
      this.setBoards().subscribe((res) => {
        if (this.selectedBoard
          && res.find((board) => board.socketUrl === this.selectedBoard.socketUrl)
          && !res.find((board) => board.socketUrl === this.selectedBoard.socketUrl).playerLimitReached) {
          this.socketService.setPlayerName(playerName);
          this.toggleName();
          setTimeout(() => {
            this.socketService.setUrl(this.selectedBoard.socketUrl);
            this.socketService.initSocket();
            this.router.navigate(['/core/game']);
          }, 300);
        } else {
          this.playerLimitWarning.openDialog();
        }
      });
  }

  chooseName(playerName: string): void {
    this.playerName = playerName;
    this.hasName = true;
  }

  private setBoards(): Observable<Board[]> {
    const result = new Subject<Board[]>();
    this.boardService.getBoards().subscribe((res) => {
      console.log(res);
      this.boards = res;
      result.next(res);
    });
    return result;
  }
}
