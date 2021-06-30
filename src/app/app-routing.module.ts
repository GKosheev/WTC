import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlayerListComponent} from "./tennis/components/player-list/player-list.component";
import {ProfileComponent} from "./tennis/components/profile/profile.component";
import {HomeComponent} from "./shared/components/home/home.component";
import {StoreComponent} from "./tennis/components/store/store.component";
import {PlayerAuthGuard} from "./shared/services/auth guards/player/player.auth.guard";
import {MembershipAuthGuard} from "./shared/services/auth guards/membership/membership.auth.guard";
import {TennisLadderComponent} from "./tennis/components/tennis-ladder/tennis-ladder.component";
import {LadderAuthGuard} from "./shared/services/auth guards/ladder/ladder.auth.guard";
import {PaymentsComponent} from "./tennis/components/payments/payments.component";
import {CourtBookingComponent} from "./tennis/components/court-booking/court-booking.component";


const routes: Routes = [
  {
    path: 'players',
    component: PlayerListComponent,
    canActivate: [PlayerAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [PlayerAuthGuard]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'store',
    component: StoreComponent,
    canActivate: [PlayerAuthGuard, MembershipAuthGuard]
  },
  {
    path: 'singles-tennis-ladder',
    component: TennisLadderComponent,
    canActivate: [PlayerAuthGuard, MembershipAuthGuard, LadderAuthGuard]
  },
  {
    path: 'payments',
    component: PaymentsComponent,
    canActivate: [PlayerAuthGuard]
  },
  {
    path: 'court-booking',
    component: CourtBookingComponent,
    canActivate: [PlayerAuthGuard, MembershipAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
