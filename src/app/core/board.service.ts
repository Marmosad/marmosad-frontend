import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Board } from '../interfaces/board';

@Injectable()
export class BoardService {

  constructor(
    private location: Location,
    private http: HttpClient
  ) { }


  public getBoards(): Observable<any> {
    return this.http.get(this.location.prepareExternalUrl('') + '/boards');
    // const board = new Array<Board>();
    // board.push({name: 'Board1', socketUrl: 'Socket1Url1', numberOfPlayers: 7, playerLimitReached: false});
    // board.push({name: 'Board2', socketUrl: 'Socket1Url2', numberOfPlayers: 5, playerLimitReached: true});
    // board.push({name: 'Board3', socketUrl: 'Socket1Url3', numberOfPlayers: 6, playerLimitReached: false});
    // const result = new Subject<Board[]>();
    // setTimeout(() => {
    //   result.next(board);
    // }, 500);
    // return result;
  }
}
