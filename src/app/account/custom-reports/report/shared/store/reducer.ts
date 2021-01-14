import { Action, createReducer, on } from '@ngrx/store';
import { find } from 'lodash';
import { onNgrxForms, setValue, updateGroup, validate, wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { AccountCustomReportsReportForm } from '../forms';
import { AccountCustomReportsReportPageActions } from './actions';
import { AccountCustomReportsReportPageState } from './state';

const initialState = new AccountCustomReportsReportPageState();

const reducer = wrapReducerWithFormStateUpdate(
  createReducer(
    initialState,
    onNgrxForms(),
    on(AccountCustomReportsReportPageActions.resetState, () => initialState),
    on(AccountCustomReportsReportPageActions.initPage, (state) => ({
      ...state,
      isLoading: true
    })),
    on(AccountCustomReportsReportPageActions.loadDataSuccess, (state, action) => ({
      ...state,
      customReport: action.response,
      isLoading: false,
      genes: action.response.customReportGenes,
      formState: updateGroup<AccountCustomReportsReportForm>(state.formState, {
        name: setValue(action.response.name)
      })
    })),
    on(AccountCustomReportsReportPageActions.loadDataFailure, (state) => ({
      ...state,
      isLoading: false
    })),
    on(AccountCustomReportsReportPageActions.fillVariations, (state, action) => ({
      ...state,
      variations: action.variations,
      formState: updateGroup<AccountCustomReportsReportForm>(state.formState, {
        customReportGene: setValue(''),
        customReportVariation: setValue('')
      })
    })),
    on(AccountCustomReportsReportPageActions.resetGenes, (state, action) => ({
      ...state,
      variations: [],
      formState: updateGroup<AccountCustomReportsReportForm>(state.formState, {
        customReportGeneID: setValue(action.value),
        customReportVariationID: setValue(action.value),
        customReportVariation: setValue('')
      })
    })),
    on(AccountCustomReportsReportPageActions.fillInterpretation, (state, action) => ({
      ...state,
      formState: updateGroup<AccountCustomReportsReportForm>(state.formState, {
        customReportVariation: setValue(''),
        result: setValue(action.result),
        interpretation: setValue(action.interpretation)
      })
    })),
    on(AccountCustomReportsReportPageActions.resetVariations, (state, action) => ({
      ...state,
      formState: updateGroup<AccountCustomReportsReportForm>(state.formState, {
        customReportVariationID: setValue(action.value),
        interpretation: setValue(''),
        result: setValue('')
      })
    }))
  ),
  (state) => state.formState,
  updateGroup<AccountCustomReportsReportForm>({
    name: validate(required),
    interpretation: validate(required),
    result: validate(required),
    customReportGene: (value, formState) => {
      if (!formState.value.customReportGeneID) {
        return validate(value, required);
      }

      return validate(value, []);
    },
    customReportGeneID: (value, formState) => {
      if (!formState.value.customReportGene) {
        return validate(value, required);
      }

      return validate(value, []);
    },
    customReportVariation: (value, formState) => {
      if (!formState.value.customReportVariationID) {
        return validate(value, required);
      }

      return validate(value, []);
    },
    customReportVariationID: (value, formState) => {
      if (!formState.value.customReportVariation) {
        return validate(value, required);
      }

      return validate(value, []);
    }
  })
);

export function accountCustomReportsReportPageReducer(state: AccountCustomReportsReportPageState | undefined, action: Action): AccountCustomReportsReportPageState {
  return reducer(state, action);
}
