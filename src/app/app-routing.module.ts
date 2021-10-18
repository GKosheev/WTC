import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./public/components/home/home.component";
import {NotFoundComponent} from "./public/components/not-found/not-found.component";
import {AuthGuard} from "./core/guards/private/private.guard";



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import ('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'private',
 //   canLoad: [PrivateGuard],
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule)
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
