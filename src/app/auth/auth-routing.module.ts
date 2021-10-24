import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnAuthGuard} from "../core/guards/un-auth/un-auth-guard";

import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {ResendConfirmEmailComponent} from "./components/resend-confirm-email/resend-confirm-email.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {ConfirmEmailComponent} from "./components/confirm-email/confirm-email.component";
import {AuthComponent} from "./auth.component";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivateChild: [UnAuthGuard],
    children: [
      {path: '', redirectTo: 'login'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password/:token', component: ResetPasswordComponent},
      {path: 'confirm-email/:token', component: ConfirmEmailComponent},
      {path: 'resend-confirm-email', component: ResendConfirmEmailComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
