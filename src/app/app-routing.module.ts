import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {LoginComponent} from "./core/components/login/login.component";
import {RegisterComponent} from "./core/components/register/register.component";
import {ProfileEditComponent} from "./tennis/components/profile-edit/profile-edit.component";
import {UserProfileComponent} from "./tennis/components/user-profile/user-profile.component";
import {ConfirmEmailComponent} from "./core/components/confirm-email/confirm-email.component";
import {NotFoundComponent} from "./core/components/not-found/not-found.component";
import {ForgotPasswordComponent} from "./core/components/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./core/components/reset-password/reset-password.component";
import {CourtsComponent} from "./tennis/components/courts/courts.component";
import {CourtComponent} from "./tennis/components/court/court.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password/:email/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'confirm-email/:email/:token',
    component: ConfirmEmailComponent,
  },
  {
    path: 'players',
    children: [
      {
        path: '',
        component: PlayerListComponent
      },
      {
        path: ':id',
        component: UserProfileComponent
      }
    ],
    canActivate: [PlayerAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [PlayerAuthGuard]
  },
  {
    path: 'profile-edit',
    component: ProfileEditComponent,
    canActivate: [PlayerAuthGuard]
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
    path: 'courts',
    component: CourtsComponent,
    canActivate: [PlayerAuthGuard, MembershipAuthGuard],
    children: [
      {
        path: ':court/:date',
        component: CourtComponent
      }
    ]
  },
  {
    path: 'book/:court/:date/:id/:time',
    component: CourtBookingComponent,
    canActivate: [PlayerAuthGuard, MembershipAuthGuard]
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy', useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
