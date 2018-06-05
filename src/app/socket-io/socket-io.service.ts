import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Message } from '../interfaces/message';
import * as SocketIo from 'socket.io-client';
import { Display } from '../interfaces/display';
import { WhiteCard } from '../interfaces/white-card';
import { Player } from '../interfaces/player';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SocketIoService {
  private playerName: string;
  private socket;
  private readonly SERVER_URL = 'http://localhost:8081';
  private display: Display;
  private players: Player[] = [];
  private submissions: WhiteCard[] = [];

  constructor(private http: HttpClient) {

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
    if (this.socket === undefined) {
      // this.socket = SocketIo({ query: 'name=' + this.playerName });
      this.socket = SocketIo(this.SERVER_URL, { query: 'name=' + this.playerName });
    } else {
      this.socket.connect();
    }
    this.socket.emit('userJoined');
    console.log('init ran ' + this.socket);
  }

  get hasSocket() {
    return !(this.socket === undefined);
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

  public onPlayerAmount(): Observable<Message> {
    return new Observable<Message>(observer => {
        this.socket.on('playerAmount', (data: Message) => {
          console.log(data);
          observer.next(data);
        });
      }
    );
  }

  public onDisplayUpdate(): Observable<Display> {
    return new Observable<Display>(observer => {
        this.socket.on('updateDisplay', (data: Display) => {
          console.log('Socket got an update for display');
          observer.next(data);
        });
      }
    );
  }

  public onReset(): Observable<any> {
    return new Observable<any>(observer => {
        this.socket.on('boardReset', (data: any) => {
          observer.next(data);
        });
      }
    );
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

  public getPlayerLimit(): Observable<any> {
    return this.http.get(this.SERVER_URL + '/playerLimit');
  }
}
