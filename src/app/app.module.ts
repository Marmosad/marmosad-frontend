import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GlobalNavbarComponent } from './global-navbar/global-navbar.component';
import { GlobalNavbarElementsComponent } from './global-navbar/global-navbar-elements/global-navbar-elements.component';
import { AppRoutingModule } from './/app-routing.module';
import { SplashComponent } from './splash/splash.component';
import { CoreComponent } from './core/core.component';
import { SplashNavigateComponent } from './splash/splash-navigate/splash-navigate.component';

@NgModule({
  declarations: [
    AppComponent,
    GlobalNavbarComponent,
    GlobalNavbarElementsComponent,
    SplashComponent,
    CoreComponent,
    SplashNavigateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
