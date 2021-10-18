import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';


import {AppComponent} from './app.component';
import {HomeComponent} from './public/components/home/home.component';
import {NavbarComponent} from './public/components/navbar/navbar.component';
import {NotFoundComponent} from './public/components/not-found/not-found.component';

import {AuthService} from "./core/services/auth/auth.service";

import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptors/header.interceptor";

import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";


export function appInitializerFactory(authService: AuthService) {
  return () => authService.checkTheUserOnFirstLoad();
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    /* Modules for navbar */
    FlexLayoutModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
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
export class AppModule {
}
