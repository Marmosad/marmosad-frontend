import { Component, OnDestroy, OnInit, Inject, ViewChild}  from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { SocketIoService } from '../../socket-io/socket-io.service';
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

  createBoard = false;
  updateBoard = true;
  newPlayerLimit = 3;
  newBoardName = '';

  @ViewChild('popup') playerLimitWarning: SimpleModalComponent;
  @ViewChild('updateBoardPopup') updateBoardModal: SimpleModalComponent;

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
    this.setBoards().subscribe(() => {
      this.selectedBoard = this.boards[0];
    });
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
          console.log(playerName);
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

  openUpdateBoardModal() {
    this.newBoardName = this.selectedBoard.name;
    this.newPlayerLimit = this.selectedBoard.playerLimit;
    this.updateBoard = true;
    this.createBoard = false;
    this.updateBoardModal.openDialog();
  }

  updateBoardBackend() {
    this.boardService.updateBoard(this.selectedBoard.socketUrl, this.newBoardName, this.newPlayerLimit)
    .subscribe((res) => {
      this.setBoards().subscribe(() => {
        console.log(res);
          this.selectedBoard = this.boards.find((board) => res.socketUrl === board.socketUrl);
      });
    }, (err) => {
      console.log(err);
    });
  }

  openCreateBoardModal() {
    this.newBoardName = '';
    this.newPlayerLimit = 3;
    this.updateBoard = false;
    this.createBoard = true;
    this.updateBoardModal.openDialog();
  }

  createBoardBackend() {
    this.boardService.createBoard(this.newBoardName, this.newPlayerLimit)
    .subscribe((res) => {
      this.setBoards().subscribe(() => {
          this.selectedBoard = this.boards.find((board) => this.newBoardName === board.name);
          this.updateBoardModal.closeDialog('Closed');
      });
    }, (err) => {
      console.log(err);
      this.updateBoardModal.closeDialog('Closed');
    });
  }

  deleteBoardBackend() {
    this.boardService.deleteBoard(this.selectedBoard.name)
    .subscribe(() => {
      this.setBoards().subscribe(() => {
          this.selectedBoard = this.boards[0] ? this.boards[0] : null;
      });
    }, (err) => {
      console.log(err);
    });
  }

  private setBoards(): Observable<Board[]> {
    const result = new Subject<Board[]>();
    this.boardService.getBoards().subscribe((res) => {
      this.boards = res;
      result.next(res);
    });
    return result;
  }

}
