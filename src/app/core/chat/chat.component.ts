import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../socket-io/socket-io.service';
import { Message } from '../../socket-io/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [
    './chat.component.scss',
  ]
})
export class ChatComponent implements OnInit {
  ioConnection: any;
  messages: string[] = [];

  constructor(private socketService: SocketIoService) {
    this.socketStart();
  }

  ngOnInit() {
  }

  private socketStart(): void {
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage().subscribe((message: Message) => {
      this.messages.push(message.from + ': ' + message.msg);
    });
  }
  sendMessage = (message: string, ): void => {
    const packet: Message = {msg: message, from: this.socketService.getSocketId()};
    this.socketService.send(packet);
    // this.messages.push(message);
    message = '';
  }
}


