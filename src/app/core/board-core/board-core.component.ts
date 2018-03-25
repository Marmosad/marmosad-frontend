import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../socket-io/socket-io.service';

@Component({
  selector: 'app-board-core',
  templateUrl: './board-core.component.html',
  styleUrls: ['./board-core.component.css']
})
export class BoardCoreComponent implements OnInit {
  playerName: string;
  hasName: boolean;

  constructor(private socketService: SocketIoService) {
  }

  ngOnInit() {
  }

  setPlayerName = (playerName: string): void => {
    this.playerName = playerName;
    this.hasName = true;
    this.socketService.setPlayerName(playerName);
  }
}
