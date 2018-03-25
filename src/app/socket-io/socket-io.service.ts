import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Message } from './message';
import * as SocketIo from 'socket.io-client';


@Injectable()
export class SocketIoService {
  private playerName: string;
  private socket;
  private readonly SERVER_URL = 'http://localhost:8080';
  public initSocket(): void {
    this.socket = SocketIo(this.SERVER_URL, { query: 'name=' + this.playerName });
    this.socket.emit('userJoined');
  }

  public send(message: Message): void {
    this.socket.emit('sendMsg', message);
  }

  public setPlayerName(playerName: string): void {
    this.playerName = playerName;
  }

  public getSocketId(): string {
    return this.socket.id;
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
        this.socket.on('message', (data: Message) => {
          observer.next(data);
        });
      }
    );
  }
}
