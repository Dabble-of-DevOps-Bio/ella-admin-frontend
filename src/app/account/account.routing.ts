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
        path: 'gene-panels',
        loadChildren: () => import('./gene-panels/gene-panels.module').then((module) => module.AccountGenePanelsPageModule)
      },
      {
        path: 'analyses',
        loadChildren: () => import('./analyses/analyses.module').then((module) => module.AccountAnalysesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
