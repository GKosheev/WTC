import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { PlayerListComponent } from './tennis/components/player-list/player-list.component';
import {DemoMaterialModule} from "./material-module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { HomeComponent } from './shared/components/home/home.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    PlayerListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,  // stores all Angular material related modules
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
