import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {UserRoutingModule} from "./user-routing.module";

import {PlayerListComponent} from "./components/player-list/player-list.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ProfileEditComponent} from "./components/profile-edit/profile-edit.component";
import {StoreComponent} from "./components/store/store.component";
import {PaymentsComponent} from "./components/payments/payments.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MessageDialogComponent} from "./components/message-dialog/message-dialog.component";
import {SubscriptionComponent} from './components/subscription/subscription.component';
import {MatSliderModule} from "@angular/material/slider";
import {MatExpansionModule} from '@angular/material/expansion';

import {FlexLayoutModule} from "@angular/flex-layout";
import {PurchasesComponent} from './components/purchases/purchases.component';
import { ChangeProfileImageComponent } from './components/change-profile-image/change-profile-image.component';

@NgModule({
  declarations: [
    PlayerListComponent,
    UserProfileComponent,
    ProfileComponent,
    ProfileEditComponent,
    StoreComponent,
    PaymentsComponent,
    MessageDialogComponent,
    SubscriptionComponent,
    PurchasesComponent,
    ChangeProfileImageComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,

    /*Purchases*/
    MatExpansionModule,

    /* players list */
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    /* players list */
    MatTooltipModule,
    MatSliderModule,
    FlexLayoutModule,
  ],
  providers: []
})
export class UserModule {
}
