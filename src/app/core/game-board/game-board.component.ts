import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../socket-io/socket-io.service';
import { Display } from '../../socket-io/display';
import { WhiteCard } from '../../socket-io/white-card';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  private display: Display;
  private hand: WhiteCard[];

  constructor(socketService: SocketIoService) {
    this.display = socketService.getDisplay;
    this.hand = this.display.players[0].hand;
    // this.hand = this.display.players[this.display.players.find((elem) => {
    //   return (elem.playerId === socketService.socketId);
    // })].hand;
  }

  ngOnInit() {
  }

  get getDisplay(): Display {
    return this.display;
  }
}
