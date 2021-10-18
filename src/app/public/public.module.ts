import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmEmailComponent} from "./components/auth/confirm-email/confirm-email.component";
import {ForgotPasswordComponent} from "./components/auth/forgot-password/forgot-password.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {ResetPasswordComponent} from "./components/auth/reset-password/reset-password.component";
import {DialogFirstAgreementComponent} from "./components/auth/register dialog components/dialog-first-agreement/dialog-first-agreement.component";
import {DialogSecondAgreementComponent} from "./components/auth/register dialog components/dialog-second-agreement/dialog-second-agreement.component";
import {DialogCovidAgreementComponent} from "./components/auth/register dialog components/dialog-covid-agreement/dialog-covid-agreement.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {MatStepperModule} from "@angular/material/stepper";
import {MatRadioModule} from "@angular/material/radio";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ResendConfirmEmailComponent} from './components/auth/resend-confirm-email/resend-confirm-email.component';

@NgModule({
  declarations: [
    /*  Auth Components  */
    LoginComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DialogFirstAgreementComponent,
    DialogSecondAgreementComponent,
    DialogCovidAgreementComponent,
    ResendConfirmEmailComponent,
    /*  Auth Components  */

  ],
  imports: [
    CommonModule,
    SharedModule, //shared.module.ts

    /* Modules for auth */
    MatCardModule,
    MatStepperModule,
    MatRadioModule,
    FlexLayoutModule,

    RouterModule.forChild([
      {path: '', redirectTo: 'login'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password/:token', component: ResetPasswordComponent},
      {path: 'confirm-email/:token', component: ConfirmEmailComponent},
      {path: 'resend-confirm-email', component: ResendConfirmEmailComponent}
    ])
  ]
})
export class PublicModule {
}
