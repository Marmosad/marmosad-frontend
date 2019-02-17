import {Component, OnChanges, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {NameService} from './name.service';

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
  inputValue = '';

  private toggleName() {
    this.showName = !this.showName;
  }

  constructor(
    private router: Router,
    private nameService: NameService,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.toggleName();
    }, 1);
  }

  get getNameState(): String {
    return this.showName ? 'start' : 'end';
  }

  public cleanInput(name: string): string {
    return name.trim().replace(' ', '');
  }

  public enterBoardSelect(name: string): void {
    this.nameService.setName(name);
    this.router.navigate(['core/board-select']);
  }

}
