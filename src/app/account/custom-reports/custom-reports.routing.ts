import { AccountCustomReportsPageComponent } from './custom-reports.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccountCustomReportsPageComponent
  },
  {
    path: 'report/:id',
    loadChildren: () => import('./report/report.module').then((module) => module.AccountCustomReportsReportPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountCustomReportsPageRoutingModule { }
