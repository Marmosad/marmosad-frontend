import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule, MatListModule, MatIconModule, MatFormFieldModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { GlobalNavbarComponent } from './global-navbar/global-navbar.component';
import { GlobalNavbarElementsComponent } from './global-navbar/global-navbar-elements/global-navbar-elements.component';
import { AppRoutingModule } from './/app-routing.module';
import { SplashComponent } from './splash/splash.component';
import { CoreComponent } from './core/core.component';
import { SplashNavigateComponent } from './splash/splash-navigate/splash-navigate.component';
import { ChatComponent } from './core/chat/chat.component';
import { SocketIoService } from './socket-io/socket-io.service';
import { FormsModule } from '@angular/forms';
import { ScoreBoardComponent } from './core/score-board/score-board.component';
import { BoardCoreComponent } from './core/board-core/board-core.component';
import { GameBoardComponent } from './core/game-board/game-board.component';


@NgModule({
  declarations: [
    AppComponent,
    GlobalNavbarComponent,
    GlobalNavbarElementsComponent,
    SplashComponent,
    CoreComponent,
    SplashNavigateComponent,
    ChatComponent,
    ScoreBoardComponent,
    BoardCoreComponent,
    GameBoardComponent,
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [SocketIoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
