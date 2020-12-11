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
      },
      {
        path: 'user-groups',
        loadChildren: () => import('./user-groups/user-groups.module').then((module) => module.AccountUserGroupsPageModule)
      },
      {
        path: 'gen-panels',
        loadChildren: () => import('./gen-panels/gen-panels.module').then((module) => module.AccountGenPanelsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
