import { Action, createReducer, on } from '@ngrx/store';
import { AccountGenePanelsPageRootActions } from './actions';
import { AccountGenePanelsPageRootState } from './state';

const initialState = new AccountGenePanelsPageRootState();

const reducer = createReducer(
  initialState,
  on(AccountGenePanelsPageRootActions.resetState, () => initialState),
  on(AccountGenePanelsPageRootActions.loadItems, (state) => ({
    ...state,
    isLoading: true
  })),
  on(AccountGenePanelsPageRootActions.loadItemsSuccess, (state, action) => ({
    ...state,
    items: action.response.items,
    totalItems: action.response.totalItems,
    isLoading: false
  })),
  on(AccountGenePanelsPageRootActions.loadItemsFailure, (state) => ({
    ...state,
    isLoading: false
  })),
  on(AccountGenePanelsPageRootActions.loadItemsByParameters, (state, action) => ({
    ...state,
    isLoading: true,
    items: [],
    totalItems: 0,
    // page: action.page || state.page,
    // orderBy: action.orderBy || state.orderBy,
    // desc: (action.desc === undefined) ? state.desc : action.desc
  }))
);

export function accountGenePanelsPageRootReducer(state: AccountGenePanelsPageRootState | undefined, action: Action): AccountGenePanelsPageRootState {
  return reducer(state, action);
}
