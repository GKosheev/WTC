import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayerListComponent} from "./components/player-list/player-list.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ProfileEditComponent} from "./components/profile-edit/profile-edit.component";
import {StoreComponent} from "./components/store/store.component";
import {TennisLadderComponent} from "./components/tennis-ladder/tennis-ladder.component";
import {PaymentsComponent} from "./components/payments/payments.component";
import {CourtsComponent} from "./components/courts/courts.component";
import {CourtComponent} from "./components/court/court.component";
import {CourtBookingComponent} from "./components/court-booking/court-booking.component";
import {RoleGuard} from "../../core/guards/roles/role.guard";
import {AuthGuard} from "../../core/guards/auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    canActivateChild: [RoleGuard, AuthGuard],
    children: [
      {
        path: 'players',
        data: {
          roles: ['member']
        },
        children: [
          {
            path: '',
            component: PlayerListComponent
          },
          {
            path: ':userId',
            component: UserProfileComponent
          }
        ],
      },
      {
        path: 'singles-tennis-ladder',
        component: TennisLadderComponent,
        data: {
          roles: ['member']
        }
      },
      {
        path: 'store',
        component: StoreComponent,
        data: {
          roles: ['member']
        }
      },


      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          roles: ['member', 'nonMember']
        }
      },
      {
        path: 'profile-edit',
        component: ProfileEditComponent,
        data: {
          roles: ['member', 'nonMember']
        }
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        data: {
          roles: ['member', 'nonMember']
        }
      },

      /*
      {
        path: 'courts',
        component: CourtsComponent,
        data: {
          roles: ['member']
        },
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
        data: {
          roles: ['member']
        }
      },
      */

    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
