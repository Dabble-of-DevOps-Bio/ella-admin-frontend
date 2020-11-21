import { Action, createReducer, on } from '@ngrx/store';
import { AccountUserGroupsPageRootActions } from './actions';
import { AccountUserGroupsPageRootState } from './state';

const initialState = new AccountUserGroupsPageRootState();

const reducer = createReducer(
  initialState,
  on(AccountUserGroupsPageRootActions.resetState, () => initialState),
  on(AccountUserGroupsPageRootActions.loadItems, (state) => ({
    ...state,
    isLoading: true
  })),
  on(AccountUserGroupsPageRootActions.loadItemsSuccess, (state, action) => ({
    ...state,
    items: action.response.items,
    totalItems: action.response.total,
    isLoading: false
  })),
  on(AccountUserGroupsPageRootActions.loadItemsFailure, (state) => ({
    ...state,
    isLoading: false
  })),
  on(AccountUserGroupsPageRootActions.loadItemsByParameters, (state, action) => ({
    ...state,
    isLoading: true,
    items: [],
    totalItems: 0,
    // page: action.page || state.page,
    // orderBy: action.orderBy || state.orderBy,
    // desc: (action.desc === undefined) ? state.desc : action.desc
  })),
  on(AccountUserGroupsPageRootActions.deleteUserGroup, (state) => ({
    ...state,
    isSendingRequest: true
  })),
  on(
    AccountUserGroupsPageRootActions.deleteUserGroupSuccess,
    AccountUserGroupsPageRootActions.deleteUserGroupFailure,
    (state) => ({
      ...state,
      isSendingRequest: false
    })
  )
);

export function accountUserGroupsPageRootReducer(state: AccountUserGroupsPageRootState | undefined, action: Action): AccountUserGroupsPageRootState {
  return reducer(state, action);
}
