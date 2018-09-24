import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player';
import { DisplayService } from '../display-service/display-service.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit, OnDestroy {
  public players: Player[] = [];

  constructor(private displayService: DisplayService) {
  }

  ngOnInit() {
    this.displayService.getScoreSubject.subscribe((players: Player[]) => {
      this.players = players
      console.log(players);
    });
  }

  ngOnDestroy() {
  }
}
