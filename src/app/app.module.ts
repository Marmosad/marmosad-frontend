import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule, MatListModule, MatIconModule } from '@angular/material';

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
  ],
  imports: [
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [SocketIoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
