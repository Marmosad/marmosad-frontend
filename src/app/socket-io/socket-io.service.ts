import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {Message} from '../interfaces/message';
import * as SocketIo from 'socket.io-client';
import {PlayerDisplay} from '../interfaces/playerDisplay';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class SocketIoService {
  private playerName: string;
  private socket;
  private url = '';

  constructor(private http: HttpClient, private location: Location) {
  }


  public initSocket(): void {
    if (this.socket === undefined) {
      if (environment.production) {
        this.socket = SocketIo({
          query: 'boardName=' + this.playerName,
          path: this.url
        });
      } else {
        this.socket = SocketIo(environment.api, {
          query: 'boardName=' + this.playerName,
          path: this.url
        });
      }
    } else {
      this.socket.connect(
        environment.api,
        {path: this.url}
      );
    }
    this.socket.emit('userJoined');
    console.log('init ran ' + this.socket);
  }

  get hasSocket() {
    return !(this.socket === undefined);
  }

  public send(message: string): void {
    this.socket.emit('chat', message);
  }

  public setPlayerName(playerName: string): void {
    this.playerName = playerName;
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

  public submitCard(card): void {
    this.socket.emit('submission', card);
  }

  public submitJudgement(card): void {
    this.socket.emit('judgment', card);
    console.log('judged');
  }

  public setUrl(url = '') {
    this.url = url;
  }
}
