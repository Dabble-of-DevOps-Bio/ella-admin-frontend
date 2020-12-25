import { Action, createReducer, on } from '@ngrx/store';
import { AccountAnalysesPageActions } from './actions';
import { AccountAnalysesPageState } from './state';

const initialState = new AccountAnalysesPageState();

const reducer = createReducer(
  initialState,
  on(AccountAnalysesPageActions.resetState, () => initialState),
  on(AccountAnalysesPageActions.loadItems, (state) => ({
    ...state,
    isLoading: true
  })),
  on(AccountAnalysesPageActions.loadItemsSuccess, (state, action) => ({
    ...state,
    items: action.response.items,
    totalItems: action.response.totalItems,
    isLoading: false
  })),
  on(AccountAnalysesPageActions.loadItemsFailure, (state) => ({
    ...state,
    isLoading: false
  })),
  on(AccountAnalysesPageActions.loadItemsByParameters, (state, action) => ({
    ...state,
    isLoading: true,
    items: [],
    totalItems: 0,
    // page: action.page || state.page,
    // orderBy: action.orderBy || state.orderBy,
    // desc: (action.desc === undefined) ? state.desc : action.desc
  }))
);

export function accountAnalysesPageReducer(state: AccountAnalysesPageState | undefined, action: Action): AccountAnalysesPageState {
  return reducer(state, action);
}
