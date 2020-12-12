import { Action, createReducer, on } from '@ngrx/store';
import { AccountGenPanelsModalDetailsActions } from './actions';
import { AccountGenPanelsModalDetailsState } from './state';
import { onNgrxForms, updateGroup, wrapReducerWithFormStateUpdate, setValue, validate } from 'ngrx-forms';
import { AccountGenPanelsDetailsForm } from '../../forms';
import { required } from 'ngrx-forms/validation';

const initialState = new AccountGenPanelsModalDetailsState();

const reducer = wrapReducerWithFormStateUpdate(
  createReducer(
    initialState,
    onNgrxForms(),
    on(AccountGenPanelsModalDetailsActions.resetState, () => initialState),
    on(AccountGenPanelsModalDetailsActions.save, (state) => ({
      ...state,
      isSubmitting: state.formState.isValid
    })),
    on(AccountGenPanelsModalDetailsActions.saveSuccess, (state) => ({
      ...state,
      isSubmitting: false
    })),
    on(AccountGenPanelsModalDetailsActions.saveFailure, (state) => ({
      ...state,
      isSubmitting: false
    })),
    on(AccountGenPanelsModalDetailsActions.loadItems, (state, action) => ({
      ...state,
      isLoading: hasMoreItems(state),
      items: [],
      page: 1
    })),
    on(AccountGenPanelsModalDetailsActions.loadItemsSuccess, (state, action) => ({
      ...state,
      items: [...state.items, ...action.response.items],
      totalItems: action.response.totalItems,
      isLoading: false
    })),
    on(AccountGenPanelsModalDetailsActions.loadItemsFailure, (state, action) => ({
      ...state,
      isLoading: false
    })),
    on(AccountGenPanelsModalDetailsActions.loadNextPage, (state, action) => ({
      ...state,
      page: (state.page) ? state.page + 1 : 1,
      isLoading: hasMoreItems(state)
    })),
    on(AccountGenPanelsModalDetailsActions.prefillForm, (state, action) => ({
      ...state,
      formState: updateGroup<AccountGenPanelsDetailsForm>(state.formState, {
        groups: setValue(action.genPanel?.groups || [])
      })
    }))
  ),
  (state) => state.formState,
  updateGroup<AccountGenPanelsDetailsForm>({
    groups: validate(required)
  })
);

function hasMoreItems(state: AccountGenPanelsModalDetailsState): boolean {
  return state.totalItems > state.items?.length;
}

export function accountGenPanelsModalDetailsReducer(state: AccountGenPanelsModalDetailsState | undefined, action: Action): AccountGenPanelsModalDetailsState {
  return reducer(state, action);
}
