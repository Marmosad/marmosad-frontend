import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Board} from '../../../interfaces/board';
import {BoardService} from '../../board.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SocketIoService} from '../../../socket-io/socket-io.service';
import {PlayerLimitComponent} from '../player-limit/player-limit.component';
import {NameService} from '../name.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

const NEW_BOARD: Board = {
  boardName: 'New Board',
  playerLimit: 3,
  numberOfPlayers: 0,
  socketUrl: 'New Board Socket Url',
  playerLimitReached: true
};

@Component({
  selector: 'app-board-select',
  templateUrl: './board-select.component.html',
  styleUrls: ['./board-select.component.scss']
})
export class BoardSelectComponent implements OnInit {
  selectedBoard: Board;
  boards = new Array<Board>();

  public newBoardToken = {...NEW_BOARD};

  constructor(
    private boardService: BoardService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private socketService: SocketIoService,
    private dialog: MatDialog,
    private nameService: NameService
  ) {
  }

  ngOnInit() {
    this.resetBoards(this.activatedRoute.snapshot.data['boards']);
    this.resetSelectedBoard();
  }

  public refreshBoards() {
    const sub = this.boardService.getBoards().subscribe(res => {
      this.resetBoards(res);
      this.resetSelectedBoard(this.selectedBoard.socketUrl);
      sub.unsubscribe();
    });
  }

  public joinBoard(board: Board) {
    const sub = this.boardService.getBoards().subscribe(res => {
      sub.unsubscribe();
      if (board && res.find(resBoard => resBoard.socketUrl === board.socketUrl) &&
        !res.find(resBoard => resBoard.socketUrl === board.socketUrl).playerLimitReached) {
        this.socketService.setPlayerName(this.nameService.getName());
        this.socketService.setUrl(board.socketUrl);
        this.socketService.initSocket();
        this.router.navigate(['/core/game']);
      } else {
        this.dialog.open(PlayerLimitComponent, {});
      }
    });
  }

  public updateBoard(board: Board) {
    const sub = this.boardService
      .updateBoard(board.socketUrl, board.boardName, board.playerLimit)
      .switchMap(event =>
        this.boardService.getBoards().map(res => {
          this.resetBoards(res);
          return event;
        })
      )
      .subscribe(res => {
        this.resetSelectedBoard(res.socketUrl);
        sub.unsubscribe();
      });
  }

  public removeBoard(board: Board) {
    const sub = this.boardService
      .removeBoard(board.socketUrl)
      .switchMap(event => this.boardService.getBoards())
      .subscribe(res => {
        this.resetBoards(res);
        this.resetSelectedBoard();
        sub.unsubscribe();
      });
  }

  public createBoard(board: Board) {
    const sub = this.boardService
      .createBoard(this.selectedBoard.boardName, this.selectedBoard.playerLimit)
      .switchMap(event => this.boardService.getBoards())
      .subscribe(res => {
        this.resetBoards(res);
        this.resetSelectedBoard();
        this.newBoardToken = {...NEW_BOARD};
        sub.unsubscribe();
      });
  }

  // sets the select board to correct socket url
  private resetSelectedBoard(socketUrl: String = '') {
    if (
      (socketUrl === '' ||
        !this.boards.find(board => socketUrl === board.socketUrl)) &&
      this.boards[0]
    ) {
      this.selectedBoard = this.boards[0];
    } else if (
      (socketUrl === '' ||
        !this.boards.find(board => socketUrl === board.socketUrl)) &&
      !this.boards[0]
    ) {
      this.selectedBoard = this.newBoardToken;
    } else {
      this.selectedBoard = this.boards.find(
        board => socketUrl === board.socketUrl
      );
    }
  }

  // resets board list
  private resetBoards(value: Array<Board>) {
    this.boards = value;
  }
}
