import { AccountComponent } from './account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then((module) => module.AccountUsersPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then((module) => module.AccountProfilePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
