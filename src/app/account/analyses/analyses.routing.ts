import { AccountAnalysesPageComponent } from './analyses.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccountAnalysesPageComponent
  },
  {
    path: 'report/:id',
    loadChildren: () => import('./report/report.module').then((module) => module.AccountAnalysesReportPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountAnalysesPageRoutingModule { }
