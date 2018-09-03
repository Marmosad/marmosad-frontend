import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Board } from '../../interfaces/board';
import { Observable } from 'rxjs/Observable';
import { BoardService } from '../board.service';
import { NameService } from './name.service';

@Injectable()
export class BoardSelectResolver implements Resolve<Array<Board>> {
  constructor(private boardService: BoardService, private nameService: NameService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Array<Board>> {
    if (this.nameService.getName()) {
      return this.boardService.getBoards();
    } else {
      this.router.navigate(['/core/lobby']);
    }
  }
}
