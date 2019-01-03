import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {Message} from '../interfaces/message';
import * as SocketIo from 'socket.io-client';
import {PlayerDisplay} from '../interfaces/playerDisplay';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {WhiteCard} from '../interfaces/white-card';
import {BlackCard} from '../interfaces/black-card';

@Injectable()
export class SocketIoService {
  get playerName(): string {
    return this._playerName;
  }
  private _playerName: string;
  private socket;
  private url = '';

  constructor(private http: HttpClient, private location: Location) {
  }


  public initSocket(): void {
    if (this.socket === undefined) {
      this.socket = SocketIo(environment.api, {
          query: 'playerName=' + this._playerName,
          path: this.url
      });
    } else {
      this.socket.connect(
        environment.api,
        {path: this.url}
      );
    }
    console.log('init ran ' + this.socket + ' at ' + environment.api, this.url);
  }

  get hasSocket() {
    return !(this.socket === undefined);
  }

  public send(message: string): void {
    this.socket.emit('chat', message);
  }

  public setPlayerName(playerName: string): void {
    this._playerName = playerName;
  }

  public getSocketId(): string {
    return this.socket.id;
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('chat', (data: Message) => {
        observer.next(data);
      });
    });
  }

  public onPlayerAmount(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('playerAmount', (data: Message) => {
        console.log(data);
        observer.next(data);
      });
    });
  }

  public onDisplayUpdate(): Observable<PlayerDisplay> {
    return new Observable<PlayerDisplay>(observer => {
      this.socket.on('updateDisplay', (data: PlayerDisplay) => {
        console.log('Socket got an update for display');
        observer.next(data);
      });
    });
  }

  public onReset(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('boardReset', (data: any) => {
        observer.next(data);
      });
    });
  }

  public closeSocket(): void {
    return this.socket.disconnect();
  }

  public startGame(): void {
    this.socket.emit('startGame', null);
  }

  public resetGame(): void {
    this.socket.emit('reset', null);
  }

  public submitCard(card: WhiteCard): void {
    this.socket.emit('submission', card);
  }

  public submitJudgement(card: WhiteCard): void {
    this.socket.emit('judgment', card);
    console.log('judged');
  }

  public setUrl(url = '') {
    this.url = url;
  }
}
