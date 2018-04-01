import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Message } from './message';
import * as SocketIo from 'socket.io-client';
import { Display } from './display';
import { WhiteCard } from './white-card';
import { Player } from './player';


@Injectable()
export class SocketIoService {
  private playerName: string;
  private socket;
  private readonly SERVER_URL = 'http://localhost:8080';
  private display: Display;
  private players: Player[] = [];
  private submissions: WhiteCard[] = [];

  constructor() {

  }

  get getDisplay(): Display {
    return this.display;
  }

  get socketId() {
    return this.socket.id;
  }

  public createFakeDisplay(playerCount: number) {
    for (let count = 0; count < playerCount; count++) {
      this.players[count] = {
        playerName: 'player #' + Math.round(count * 10 * Math.random()),
        playerId: 'player' + count,
        hand: this.generateFakeHand(),
        isJudge: false,
        score: Math.round(count * 3 * Math.random())
      };
      this.submissions[count] = {
        cardId: Math.round(count * 10 * Math.random()),
        body: 'This is a body of the white card, randomly generated ' + count,
        owner: 'player' + count
      };
    }
    this.display = {
      blackCard: {
        cardId: 122,
        body: 'This is a body of the black card, randomly generated',
        owner: 'Stellar, he\'s always judge',
      },
      currentJudge: 'Stellar, she\'s always judge',
      submissions: this.submissions,
      players: this.players
    };
  }

  private generateFakeHand(): WhiteCard[] {
    const array: WhiteCard[] = [];
    for (let count = 0; count < 7; count++) {
      array[count] = {
        cardId: Math.round(99 * Math.random()),
        body: 'This is a body of the white card, randomly generated ' + count,
        owner: 'player' + count
      };
    }
    return array;
  }

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
