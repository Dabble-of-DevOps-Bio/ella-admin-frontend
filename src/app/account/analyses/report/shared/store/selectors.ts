import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AccountAnalysesReportPageState } from './state';
import { AnalysisPatientData, AnalysisVariantReport } from '@shared/analysis';

const selectFeature = (state: AppState) => state.accountAnalysesReportPage as AccountAnalysesReportPageState;

export class AccountAnalysesReportPageSelectors {
  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountAnalysesReportPageState) => state.isLoading
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
}
