import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AccountCustomReportsReportPageState } from './state';
import { FormGroupState } from 'ngrx-forms';
import { AccountCustomReportsReportForm } from '../forms';
import { CustomReport } from '@shared/custom-report';

const selectFeature = (state: AppState) => state.accountCustomReportsReportPage as AccountCustomReportsReportPageState;

export class AccountCustomReportsReportPageSelectors {
  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountCustomReportsReportPageState) => state.isLoading
  );

  public static isSendingRequest: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountCustomReportsReportPageState) => state.isSendingRequest
  );

  public static customReport: MemoizedSelector<AppState, CustomReport> = createSelector(
    selectFeature,
    (state: AccountCustomReportsReportPageState) => state.customReport
  );

  public static formState: MemoizedSelector<AppState, FormGroupState<AccountCustomReportsReportForm>> = createSelector(
    selectFeature,
    (state: AccountCustomReportsReportPageState) => state.formState
  );
}
