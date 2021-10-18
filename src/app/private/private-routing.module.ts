import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RoleGuard} from "../core/guards/roles/role.guard";
import {AuthGuard} from "../core/guards/private/private.guard";


const routes: Routes = [
  {
    path: 'user',
    canLoad: [AuthGuard],
    loadChildren: () => import('./user/users.module').then(m => m.UsersModule)
  },
  {
    path: 'admin',
    canLoad: [RoleGuard],
    data: {
      roles: 'admin'
    },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {
}
