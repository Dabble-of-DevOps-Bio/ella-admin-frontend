import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AccountAnalysesReportPageRootState } from './state';
import { AnalysisPatientData, AnalysisVariantReport } from '@shared/analysis';
import { FormGroupState } from 'ngrx-forms';
import { AccountAnalysesReportForm } from '../../forms';

const selectFeature = (state: AppState) => state.accountAnalysesReportPage.rootState as AccountAnalysesReportPageRootState;

export class AccountAnalysesReportPageRootSelectors {
  public static isPatientLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountAnalysesReportPageRootState) => state.isPatientLoading
  );

  public static isReportLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountAnalysesReportPageRootState) => state.isReportLoading
  );

  public static isSendingRequest: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountAnalysesReportPageRootState) => state.isSendingRequest
  );

  public static patientData: MemoizedSelector<AppState, AnalysisPatientData> = createSelector(
    selectFeature,
    (state: AccountAnalysesReportPageRootState) => state.patientData
  );

  public static report: MemoizedSelector<AppState, AnalysisVariantReport> = createSelector(
    selectFeature,
    (state: AccountAnalysesReportPageRootState) => state.report
  );

  public static formState: MemoizedSelector<AppState, FormGroupState<AccountAnalysesReportForm>> = createSelector(
    selectFeature,
    (state: AccountAnalysesReportPageRootState) => state.formState
  );
}
