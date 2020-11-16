import { Action, createReducer, on } from '@ngrx/store';
import { PublicChangePasswordPageActions } from './actions';
import { PublicChangePasswordPageState } from './state';

const initialState = new PublicChangePasswordPageState();

const reducer = createReducer(
  initialState,
  on(PublicChangePasswordPageActions.resetState, () => initialState)
);

export function publicChangePasswordPageReducer(state: PublicChangePasswordPageState | undefined, action: Action): PublicChangePasswordPageState {
  return reducer(state, action);
}
