import { Action, createReducer, on } from '@ngrx/store';
import { AccountUsersPageRootActions } from './actions';
import { AccountUsersPageRootState } from './state';

const initialState = new AccountUsersPageRootState();

const reducer = createReducer(
  initialState,
  on(AccountUsersPageRootActions.resetState, () => initialState),
  on(AccountUsersPageRootActions.loadItems, (state) => ({
    ...state,
    isLoading: true
  })),
  on(AccountUsersPageRootActions.loadItemsSuccess, (state, action) => ({
    ...state,
    items: action.response.items,
    totalItems: action.response.total,
    isLoading: false
  })),
  on(AccountUsersPageRootActions.loadItemsFailure, (state) => ({
    ...state,
    isLoading: false
  })),
  on(AccountUsersPageRootActions.loadItemsByParameters, (state, action) => ({
    ...state,
    isLoading: true,
    items: [],
    totalItems: 0,
    // page: action.page || state.page,
    // orderBy: action.orderBy || state.orderBy,
    // desc: (action.desc === undefined) ? state.desc : action.desc
  })),
  on(AccountUsersPageRootActions.deleteUser, (state) => ({
    ...state,
    isSendingRequest: true
  })),
  on(
    AccountUsersPageRootActions.deleteUserSuccess,
    AccountUsersPageRootActions.deleteUserFailure,
    (state) => ({
      ...state,
      isSendingRequest: false
    })
  )
);

export function accountUsersPageRootReducer(state: AccountUsersPageRootState | undefined, action: Action): AccountUsersPageRootState {
  return reducer(state, action);
}
