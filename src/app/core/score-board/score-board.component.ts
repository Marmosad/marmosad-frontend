import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../socket-io/socket-io.service';
import { Player } from '../../socket-io/player';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {
  private players: Player[] = [];
  constructor(socketService: SocketIoService) {
    this.players = socketService.getDisplay.players;
  }

  ngOnInit() {
  }

  get getPlayers(): Player[] {
    return this.players;
  }
}
