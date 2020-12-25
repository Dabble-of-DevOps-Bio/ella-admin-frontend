import { Action, createReducer, on } from '@ngrx/store';
import { AccountGenePanelsModalDetailsActions } from './actions';
import { AccountGenePanelsModalDetailsState } from './state';
import { onNgrxForms, updateGroup, wrapReducerWithFormStateUpdate, setValue, validate, box } from 'ngrx-forms';
import { AccountGenePanelsDetailsForm } from '../../forms';
import { required } from 'ngrx-forms/validation';

const initialState = new AccountGenePanelsModalDetailsState();

const reducer = wrapReducerWithFormStateUpdate(
  createReducer(
    initialState,
    onNgrxForms(),
    on(AccountGenePanelsModalDetailsActions.resetState, () => initialState),
    on(AccountGenePanelsModalDetailsActions.save, (state) => ({
      ...state,
      isSubmitting: state.formState.isValid
    })),
    on(AccountGenePanelsModalDetailsActions.saveSuccess, (state) => ({
      ...state,
      isSubmitting: false
    })),
    on(AccountGenePanelsModalDetailsActions.saveFailure, (state) => ({
      ...state,
      isSubmitting: false
    })),
    on(AccountGenePanelsModalDetailsActions.loadItems, (state, action) => ({
      ...state,
      isLoading: hasMoreItems(state),
      items: [],
      page: 1
    })),
    on(AccountGenePanelsModalDetailsActions.loadItemsSuccess, (state, action) => ({
      ...state,
      items: [...state.items, ...action.response.items],
      totalItems: action.response.totalItems,
      isLoading: false
    })),
    on(AccountGenePanelsModalDetailsActions.loadItemsFailure, (state, action) => ({
      ...state,
      isLoading: false
    })),
    on(AccountGenePanelsModalDetailsActions.loadNextPage, (state, action) => ({
      ...state,
      page: (state.page) ? state.page + 1 : 1,
      isLoading: hasMoreItems(state)
    })),
    on(AccountGenePanelsModalDetailsActions.prefillForm, (state, action) => ({
      ...state,
      formState: updateGroup<AccountGenePanelsDetailsForm>(state.formState, {
        id: setValue(action.genPanel?.id),
        groups: setValue(box(action.genPanel?.groups || []))
      })
    }))
  ),
  (state) => state.formState,
  updateGroup<AccountGenePanelsDetailsForm>({
    groups: validate(required)
  })
);

function hasMoreItems(state: AccountGenePanelsModalDetailsState): boolean {
  return state.totalItems > state.items?.length;
}

export function accountGenePanelsModalDetailsReducer(state: AccountGenePanelsModalDetailsState | undefined, action: Action): AccountGenePanelsModalDetailsState {
  return reducer(state, action);
}
