import {Component, OnDestroy, OnInit, Inject} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { SocketIoService } from '../../socket-io/socket-io.service';
import {Router} from '@angular/router';
import { JQUERY_TOKEN } from '../../common/jquery.service';

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

  constructor(private socketService: SocketIoService, private router: Router, @Inject(JQUERY_TOKEN) private jq_token: any ) { }

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
      this.socketService.onPlayerNumber().subscribe((data:any) => {
        if(data.playerNumber > data.playerLimit) {
          this.jq_token('#simple-modal').modal('show');
        } else {
          this.router.navigate(['/core/game']);
        }
      });
    }, 300);
  }

  chooseName(playerName: string): void {
    this.playerName = playerName;
    this.hasName = true;
  }
}
