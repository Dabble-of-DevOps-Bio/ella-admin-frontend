import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard, UnauthenticatedGuard } from '@shared/auth';
import { IsAdminGuard } from '@shared/user';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AuthenticatedGuard, IsAdminGuard],
    loadChildren: () => import('./account/account.module').then((module) => module.AccountModule)
  },
  {
    path: '',
    canActivate: [UnauthenticatedGuard],
    loadChildren: () => import('./public/public.module').then((module) => module.PublicModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
