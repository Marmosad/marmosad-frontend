const SPOPPY_GHOST = 'ghost_SPOOOK';

import { Component, OnInit } from '@angular/core';
import { WhiteCard } from '../../interfaces/white-card';
import { DisplayService } from '../display-service/display-service.service';
import { BlackCard } from '../../interfaces/black-card';
import { SocketIoService } from '../../socket-io/socket-io.service';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { interval } from 'rxjs/observable/interval';
import { throttle } from 'rxjs/operators';
import { dragAnimation } from './drag-animation';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
  animations: [dragAnimation]
})

export class GameBoardComponent implements OnInit {
  private hand: WhiteCard[];
  private blackCard: BlackCard;
  private submissions: WhiteCard[];
  private ghostCard = {
    cardId: null,
    body: '',
    owner: SPOPPY_GHOST,
  };
  private ghostExist = false;
  private draggedCard: WhiteCard = null;
  private pointerPosition: any = fromEvent(document, 'mousemove');
  private mouseUp: any = fromEvent(document, 'mouseup');
  private resize: any;
  private dragItemClone: any = null;
  private dragItem: any = null;
  private submissionDimensions: any;
  private cursorX: number;
  private cursorY: number;
  private cursorInSubmissions = false;

  constructor(private displayService: DisplayService, private socketIoService: SocketIoService) {
  }

  ngOnInit() {
    this.resize = fromEvent(window, 'resize');
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
    this.socketIoService.onReset().subscribe((data: any) => {
      window.location.reload();
    });
    this.trackPointerPosition();
    this.trackMouseUp();
    this.trackResize();
    this.submissionDimensions = document.getElementById('submissions').getBoundingClientRect();
  }

  private trackPointerPosition() {
    this.pointerPosition.pipe(throttle(val => interval(20))).subscribe(e => {
      this.cursorX = e.clientX;
      this.cursorY = e.clientY;

      this.cursorInSubmissions = this.cursorX > this.submissionDimensions.left && this.cursorX < this.submissionDimensions.right &&
        this.cursorY > this.submissionDimensions.top && this.cursorY < (this.submissionDimensions.top + this.submissionDimensions.height);
      if (this.draggedCard !== null) {
        if (this.cursorInSubmissions) {
          this.addGhost();
        } else {
          this.removeGhost();
        }
      }

      if (this.dragItemClone !== null) {
        this.dragItemClone.style.left = this.cursorX + 'px';
        this.dragItemClone.style.top = this.cursorY + 'px';
      }
    });
  }

  private trackMouseUp() {
    this.mouseUp.subscribe(e => {
      console.log('submit ' + this.cursorInSubmissions);
      if (this.cursorInSubmissions) {
        this.submitCard(this.draggedCard);
        this.draggedCard = null;
        this.removeGhost();
      }
      this.endDrag();
    });
  }

  private trackResize() {
    this.resize.pipe(throttle(val => interval(20))).subscribe(e => {
      this.submissionDimensions = document.getElementById('submissions').getBoundingClientRect();
    });
  }

  private startDrag(i) {
    this.submissionDimensions = document.getElementById('submissions').getBoundingClientRect();
    if (this.isJudge) {
      return;
    }
    this.draggedCard = this.hand[i];
    console.log('drag start');
    this.dragItem = document.getElementById(i.toString());
    console.log(this.dragItem.cloneNode(true));
    this.dragItemClone = this.dragItem.cloneNode(true);
    this.dragItem.style.opacity = '0';
    this.styleClone(this.dragItemClone, this.dragItem.getBoundingClientRect());
    document.body.appendChild(this.dragItemClone);
  }

  private styleClone(clone, dimensions) {
    clone.style.position = 'fixed';
    clone.style.marginTop = '-' + (dimensions.height / 2) + 'px';
    clone.style.marginLeft = '-' + (dimensions.width / 2) + 'px';
    clone.style.height = dimensions.height + 'px';
    clone.style.width = dimensions.width + 'px';
    clone.style.left = this.cursorX + 'px';
    clone.style.top = this.cursorY + 'px';
    console.log(clone.style);
  }

  private endDrag() {
    console.log('drag end');
    if (this.dragItem !== null) {
      this.dragItemClone.remove();
      this.dragItem.style.opacity = '1';
      this.dragItemClone = null;
      this.dragItem = null;
    }
    this.draggedCard = null;
  }

  private startGame(): void {
    this.socketIoService.startGame();
  }

  private resetGame(): void {
    this.socketIoService.resetGame();
  }

  private submitCard(card: WhiteCard): void {
    if (!this.isJudge) {
      this.socketIoService.submitCard(card);
    }
  }

  private submitJudgement(card: WhiteCard): void {
    if (this.isJudge) {
      this.socketIoService.submitJudgement(card);
    }
  }

  get isJudge() {
    return this.displayService.getIsJudge;
  }

  private addGhost() {
    if (!this.ghostExist && this.draggedCard !== null) {
      this.submissions.push(this.ghostCard);
      this.ghostExist = true;
    }
  }

  private removeGhost() {
    if (this.ghostExist) {
      const ghostIndex = this.submissions.findIndex(function (elem) {
        return (elem.owner === SPOPPY_GHOST);
      });
      this.submissions.splice(ghostIndex, 1);
      this.ghostExist = false;
    }
  }
}
