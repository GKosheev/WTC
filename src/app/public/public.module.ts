import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {PublicComponent} from "./components/public.component";

@NgModule({
  declarations: [
    PublicComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ]
})
export class PublicModule {
}
