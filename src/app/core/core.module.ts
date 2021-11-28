import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuard} from "./guards/auth/auth.guard";
import {RoleGuard} from "./guards/roles/role.guard";
import {UnAuthGuard} from "./guards/un-auth/un-auth-guard";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SnackbarService} from "../shared/services/snackbar/snackbar.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers:[
    SnackbarService,
    AuthGuard,
    RoleGuard,
    UnAuthGuard
  ]
})
export class CoreModule { }
