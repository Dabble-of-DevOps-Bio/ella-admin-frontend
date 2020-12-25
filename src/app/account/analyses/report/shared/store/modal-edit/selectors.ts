import { AppState } from '@shared/store';
import { AccountAnalysesResultForm } from '../../forms';
import { AccountAnalysesReportModalEditState } from './state';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';

const selectFeature = (state: AppState) => state.accountAnalysesReportPage.modalEdit;

export class AccountAnalysesReportModalEditSelectors {
  public static formState: MemoizedSelector<AppState, FormGroupState<AccountAnalysesResultForm>> = createSelector(
    selectFeature,
    (state: AccountAnalysesReportModalEditState) => state.formState
  );
}
