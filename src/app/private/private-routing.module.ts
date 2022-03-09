import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RoleGuard} from "../core/guards/roles/role.guard";
import {AuthGuard} from "../core/guards/auth/auth.guard";
import {HomeComponent} from "./home/home.component";
import {PrivateComponent} from "./private.component";


const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    canLoad: [AuthGuard],
    children: [
/*      {
        path: 'home',
        component: HomeComponent,
        canLoad: [AuthGuard]
      },*/
      {
        path: 'user',
        canLoad: [AuthGuard],
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'admin',
        canLoad: [RoleGuard],
        data: {
          roles: 'admin'
        },
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/private/user/profile' // TODO change to home when it's ready
      }
    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {
}
