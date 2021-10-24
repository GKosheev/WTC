import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';


import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {DialogFirstAgreementComponent} from "./components/register dialog components/dialog-first-agreement/dialog-first-agreement.component";
import {DialogSecondAgreementComponent} from "./components/register dialog components/dialog-second-agreement/dialog-second-agreement.component";
import {DialogCovidAgreementComponent} from "./components/register dialog components/dialog-covid-agreement/dialog-covid-agreement.component";
import {ResendConfirmEmailComponent} from "./components/resend-confirm-email/resend-confirm-email.component";
import {SharedModule} from "../shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {MatStepperModule} from "@angular/material/stepper";
import {MatRadioModule} from "@angular/material/radio";
import {FlexLayoutModule} from "@angular/flex-layout";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ConfirmEmailComponent} from "./components/confirm-email/confirm-email.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";

@NgModule({
  declarations: [
    AuthComponent,

    /* Auth components */
    LoginComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DialogFirstAgreementComponent,
    DialogSecondAgreementComponent,
    DialogCovidAgreementComponent,
    ResendConfirmEmailComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,

    SharedModule, //shared.module.ts

    /* Modules for auth */
    MatCardModule,
    MatStepperModule,
    MatRadioModule,
    FlexLayoutModule,
  ]
})
export class AuthModule {
}
