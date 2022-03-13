import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {LayoutModule} from "@angular/cdk/layout";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SnackbarService} from "./services/snackbar/snackbar.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  imports: [],
  declarations: [],
  exports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
    MatNativeDateModule,
    MatCheckboxModule,
    LayoutModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers: [
    SnackbarService
  ]
})
export class SharedModule {
}
