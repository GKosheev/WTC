import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PlayerListComponent} from './tennis/components/player-list/player-list.component';
import {DemoMaterialModule} from "./material-module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './core/components/login/login.component';
import {RegisterComponent} from './core/components/register/register.component';
import {HomeComponent} from './shared/components/home/home.component';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {ProfileComponent} from './tennis/components/profile/profile.component';
import {StoreComponent} from './store/store.component';
import {TennisLadderComponent} from './tennis/components/tennis-ladder/tennis-ladder.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PaymentsComponent} from './tennis/components/payments/payments.component';
import {CourtBookingComponent} from './tennis/components/court-booking/court-booking.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlayerListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    StoreComponent,
    TennisLadderComponent,
    PaymentsComponent,
    CourtBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,  // stores all Angular material related modules
    BrowserAnimationsModule,
    FlexLayoutModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
