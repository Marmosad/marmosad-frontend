import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../socket-io/socket-io.service';
import { Message } from '../../interfaces/message';
import { PlayerDisplay } from '../../interfaces/playerDisplay';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [
    './chat.component.scss',
  ]
})
export class ChatComponent implements OnInit {
  messages: string[] = [];

  constructor(private socketService: SocketIoService) {
    this.socketStart();
    this.socketService.onMessage().subscribe((message: Message) => {
      this.messages.push(message.from + ': ' + message.msg);
    });
  }

  ngOnInit() {
  }

  private socketStart(): void {
  }
  sendMessage = (message: string ): void => {
    this.socketService.send(message);
    // this.messages.push(message);
    message = '';
  }
}


