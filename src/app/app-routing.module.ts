import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { CoreComponent } from './core/core.component';
import { BoardCoreComponent } from './core/board-core/board-core.component';
import { LobbyComponent } from './core/lobby/lobby.component';
import { CoreCanActivate } from './core/core-route-activator.service';

const routes: Routes = [
  { path: '', redirectTo: '/splash', pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  { path: 'core', component: CoreComponent,
  children: [
    {path: '', redirectTo: 'lobby', pathMatch: 'full' },
    {path: 'lobby', component: LobbyComponent},
    {path: 'game', component: BoardCoreComponent, canActivate: [CoreCanActivate]}
  ]}
];


@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ]
})
export class AppRoutingModule {
}
