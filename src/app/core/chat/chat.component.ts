import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../socket-io/socket-io.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [
    './chat.component.scss',
  ]
})
export class ChatComponent implements OnInit {
  testMsg = 'sup';
  ioConnection: any;
  testMsgs: string[] = ['hi', 'bye', 'joined', 'test', 'something really long to see how it does really long to see how it', 'bye'];
  messageContent: string;

  constructor(private socketService: SocketIoService) {
    this.socketStart(socketService);
  }

  ngOnInit() {
  }

  private socketStart(socketService): void {
    socketService.initSocket();
    this.ioConnection = this.socketService.onDong().subscribe((dong: string) => {
      this.testMsg = dong;
    });
  }

  sendMessage = (): void => {
  };

  get getColor() {
    return 'color: ThemePalette';
  }
}
