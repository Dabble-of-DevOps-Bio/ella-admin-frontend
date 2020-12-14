import { Action, createReducer, on } from '@ngrx/store';
import { AccountGenPanelsPageRootActions } from './actions';
import { AccountGenPanelsPageRootState } from './state';

const initialState = new AccountGenPanelsPageRootState();

const reducer = createReducer(
  initialState,
  on(AccountGenPanelsPageRootActions.resetState, () => initialState),
  on(AccountGenPanelsPageRootActions.loadItems, (state) => ({
    ...state,
    isLoading: true
  })),
  on(AccountGenPanelsPageRootActions.loadItemsSuccess, (state, action) => ({
    ...state,
    items: action.response.items,
    totalItems: action.response.totalItems,
    isLoading: false
  })),
  on(AccountGenPanelsPageRootActions.loadItemsFailure, (state) => ({
    ...state,
    isLoading: false
  })),
  on(AccountGenPanelsPageRootActions.loadItemsByParameters, (state, action) => ({
    ...state,
    isLoading: true,
    items: [],
    totalItems: 0,
    // page: action.page || state.page,
    // orderBy: action.orderBy || state.orderBy,
    // desc: (action.desc === undefined) ? state.desc : action.desc
  }))
);

export function accountGenPanelsPageRootReducer(state: AccountGenPanelsPageRootState | undefined, action: Action): AccountGenPanelsPageRootState {
  return reducer(state, action);
}
