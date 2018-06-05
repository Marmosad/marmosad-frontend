import {Component, OnDestroy, OnInit, Inject, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { SocketIoService } from '../../socket-io/socket-io.service';
import {Router} from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SimpleModalComponent } from '../../common/simple-modal/simple-modal.component';

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

  @ViewChild('popup') playerLimitWarning: SimpleModalComponent;

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
      this.socketService.getPlayerLimit().subscribe((data: any) => {
        if (data.isLimitReached) {
          this.playerLimitWarning.openDialog();
        } else {
          this.socketService.setPlayerName(playerName);
          this.socketService.initSocket();
          this.toggleName();
          setTimeout(() => {
            this.router.navigate(['/core/game']);
          }, 300);
        }
      });
  }

  chooseName(playerName: string): void {
    this.playerName = playerName;
    this.hasName = true;
  }
}
