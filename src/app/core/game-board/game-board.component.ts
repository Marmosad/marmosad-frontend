import { Component, OnInit } from '@angular/core';
import { Display } from '../../interfaces/display';
import { WhiteCard } from '../../interfaces/white-card';
import { DisplayService } from '../display-service/display-service.service';
import { Player } from '../../interfaces/player';
import { BlackCard } from '../../interfaces/black-card';
import { SocketIoService } from '../../socket-io/socket-io.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  private hand: WhiteCard[];
  private blackCard: BlackCard;
  private submissions: WhiteCard[];

  constructor(private displayService: DisplayService, private socketIoService: SocketIoService) {
  }

  ngOnInit() {
    this.displayService.getHandSubject.subscribe((hand: WhiteCard[]) => {
      this.hand = hand;
      console.log(hand);
    });
    this.displayService.getBlackCardSubject.subscribe((blackCard: BlackCard) => {
      this.blackCard = blackCard;
      console.log(blackCard);
    });
    this.displayService.getSubmissionsSubject.subscribe((submissions: WhiteCard[]) => {
      this.submissions = submissions;
    });
  }

  private startGame(): void {
    this.socketIoService.startGame();
  }

  private submitCard(card: WhiteCard): void {
    this.socketIoService.submitCard(card);
  }
}
