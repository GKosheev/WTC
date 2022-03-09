import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayerListComponent} from "./components/player-list/player-list.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ProfileEditComponent} from "./components/profile-edit/profile-edit.component";
import {StoreComponent} from "./components/store/store.component";
import {PaymentsComponent} from "./components/payments/payments.component";
import {RoleGuard} from "../../core/guards/roles/role.guard";
import {AuthGuard} from "../../core/guards/auth/auth.guard";
import {SubscriptionComponent} from "./components/subscription/subscription.component";
import {PurchasesComponent} from "./components/purchases/purchases.component";

const routes: Routes = [
  {
    path: '',
    canActivateChild: [RoleGuard, AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/private/user/profile',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          roles: ['public']
        }
      },
      {
        path: 'profile-edit',
        component: ProfileEditComponent,
        data: {
          roles: ['public']
        }
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        data: {
          roles: ['public']
        }
      },
      {
        path: 'subscription',
        component: SubscriptionComponent,
        data: {
          roles: ['public']
        }
      },
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
        path: 'store',
        component: StoreComponent,
        data: {
          roles: ['member']
        }
      },
      {
        path: 'purchases',
        component: PurchasesComponent,
        data: {
          roles: ['public']
        }
      }
    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
