import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { SocketIoService } from '../socket-io/socket-io.service';

@Injectable()
export class CoreCanActivate implements CanActivate {
  constructor(private socketService: SocketIoService, private router: Router) {

  }

  canActivate() {
    const hasSocket = this.socketService.hasSocket;
    if (!hasSocket) {
      this.router.navigate(['/splash']);
    }
    return this.socketService.hasSocket;
  }
}
