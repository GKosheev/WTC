import {APP_ID, APP_INITIALIZER, NgModule} from '@angular/core';
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
import {StoreComponent} from './tennis/components/store/store.component';
import {TennisLadderComponent} from './tennis/components/tennis-ladder/tennis-ladder.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PaymentsComponent} from './tennis/components/payments/payments.component';
import {CourtBookingComponent} from './tennis/components/court-booking/court-booking.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DialogFirstAgreementComponent } from './core/components/register dialog components/dialog-first-agreement/dialog-first-agreement.component';
import { DialogSecondAgreementComponent } from './core/components/register dialog components/dialog-second-agreement/dialog-second-agreement.component';
import { DialogCovidAgreementComponent } from './core/components/register dialog components/dialog-covid-agreement/dialog-covid-agreement.component';
import {AuthService} from "./shared/services/auth/auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./core/components/interceptors/header.interceptor";
import {HttpClientModule} from '@angular/common/http';
import { ProfileEditComponent } from './tennis/components/profile-edit/profile-edit.component';
import { UserProfileComponent } from './tennis/components/user-profile/user-profile.component';
import { MessageDialogComponent } from './tennis/components/message-dialog/message-dialog.component';
import { ConfirmEmailComponent } from './core/components/confirm-email/confirm-email.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';


export function appInitializerFactory(authService: AuthService) {
  return () => authService.checkTheUserOnFirstLoad();
}


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
    CourtBookingComponent,
    DialogFirstAgreementComponent,
    DialogSecondAgreementComponent,
    DialogCovidAgreementComponent,
    ProfileEditComponent,
    UserProfileComponent,
    MessageDialogComponent,
    ConfirmEmailComponent,
    NotFoundComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DemoMaterialModule,  // stores all Angular material related modules
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule

    ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      multi: true,
      deps: [AuthService]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
