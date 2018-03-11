import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Message} from './message';
import * as SocketIo from 'socket.io-client';


@Injectable()
export class SocketIoService {
  private socket;
  private readonly SERVER_URL = 'http://localhost:8080';

  public initSocket(): void {
    this.socket = SocketIo(this.SERVER_URL);
    this.socket.emit('ding', 'get me back!');
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public onDong(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('dong', (data: any) => observer.next(data));
    });
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }
}
