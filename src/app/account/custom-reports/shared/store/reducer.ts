import { Action, createReducer, on } from '@ngrx/store';
import { AccountCustomReportsPageActions } from './actions';
import { AccountCustomReportsPageState } from './state';

const initialState = new AccountCustomReportsPageState();

const reducer = createReducer(
  initialState,
  on(AccountCustomReportsPageActions.resetState, () => initialState),
  on(AccountCustomReportsPageActions.loadItems, (state) => ({
    ...state,
    isLoading: true
  })),
  on(AccountCustomReportsPageActions.loadItemsSuccess, (state, action) => ({
    ...state,
    items: action.response.items,
    totalItems: action.response.totalItems,
    isLoading: false
  })),
  on(AccountCustomReportsPageActions.loadItemsFailure, (state) => ({
    ...state,
    isLoading: false
  })),
  on(AccountCustomReportsPageActions.loadItemsByParameters, (state, action) => ({
    ...state,
    isLoading: true,
    items: [],
    totalItems: 0,
    // page: action.page || state.page,
    // orderBy: action.orderBy || state.orderBy,
    // desc: (action.desc === undefined) ? state.desc : action.desc
  }))
);

export function accountCustomReportsPageReducer(state: AccountCustomReportsPageState | undefined, action: Action): AccountCustomReportsPageState {
  return reducer(state, action);
}
