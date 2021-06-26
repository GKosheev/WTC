import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlayerListComponent} from "./player-list/player-list.component";


const routes: Routes = [
  {
    path: 'players',
    component: PlayerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
