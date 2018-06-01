import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { SocketIoService } from '../../socket-io/socket-io.service';
import {Router} from '@angular/router';

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

  private toggleName() {
    this.showName = !this.showName;
  }

  constructor(private socketService: SocketIoService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.toggleName();
    }, 1);
  }

  get getNameState(): String {
    return this.showName ? 'start' : 'end';
  }

  public enterGame(playerName: string): void {
    this.toggleName();
    setTimeout(() => {
      this.socketService.setPlayerName(playerName);
      this.socketService.initSocket();
      this.router.navigate(['/core/game']);
    }, 300);
  }

  chooseName(playerName: string): void {
    this.playerName = playerName;
    this.hasName = true;
  }
}
