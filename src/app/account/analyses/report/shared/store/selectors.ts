import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AccountAnalysesReportPageState } from './state';
import { AnalysisPatientData, AnalysisVariantReport } from '@shared/analysis';
import { FormGroupState } from 'ngrx-forms';
import { AccountAnalysesReportForm } from '../forms';

const selectFeature = (state: AppState) => state.accountAnalysesReportPage as AccountAnalysesReportPageState;

export class AccountAnalysesReportPageSelectors {
  public static isPatientLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountAnalysesReportPageState) => state.isPatientLoading
  );

  public static isReportLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountAnalysesReportPageState) => state.isReportLoading
  );

  public static isSendingRequest: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountAnalysesReportPageState) => state.isSendingRequest
  );

  public static patientData: MemoizedSelector<AppState, AnalysisPatientData> = createSelector(
    selectFeature,
    (state: AccountAnalysesReportPageState) => state.patientData
  );

  public static report: MemoizedSelector<AppState, AnalysisVariantReport> = createSelector(
    selectFeature,
    (state: AccountAnalysesReportPageState) => state.report
  );

  public static formState: MemoizedSelector<AppState, FormGroupState<AccountAnalysesReportForm>> = createSelector(
    selectFeature,
    (state: AccountAnalysesReportPageState) => state.formState
  );
}
