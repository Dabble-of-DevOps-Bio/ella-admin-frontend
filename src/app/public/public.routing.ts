import { PublicComponent } from './public.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then((module) => module.PublicLoginPageModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('./change-password/change-password.module').then((module) => module.PublicChangePasswordPageModule)
      },
      /*{
        path: '**',
        loadChildren: () => import('./login/login.module').then((module) => module.PublicLoginPageModule)
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
