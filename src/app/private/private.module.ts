import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PrivateRoutingModule} from "./private-routing.module";
import {PrivateComponent} from "./private.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {PaymentsService} from "./user/services/payments/payments.service";
import {CoreModule} from "../core/core.module";
import {MatBadgeModule} from "@angular/material/badge";


@NgModule({
  declarations: [
    PrivateComponent
  ],
    imports: [
        CommonModule,
        PrivateRoutingModule,

        /* Modules for navbar */
        FlexLayoutModule,
        MatDividerModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        CoreModule,
        MatBadgeModule
    ],
  providers: [
    PaymentsService,
  ]
})
export class PrivateModule {
}
