import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./public/components/not-found/not-found.component";
import {UnAuthGuard} from "./core/guards/un-auth/un-auth-guard";
import {AuthGuard} from "./core/guards/auth/auth.guard";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'public'
  },
  {
    path: 'auth',
    canLoad: [UnAuthGuard],
    loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'private',
    canLoad: [AuthGuard],
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule)
  },
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy', useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
