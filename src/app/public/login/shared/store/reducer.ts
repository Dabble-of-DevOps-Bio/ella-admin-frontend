import { Action, createReducer, on } from '@ngrx/store';
import { PublicLoginPageActions } from './actions';
import { PublicLoginPageState } from './state';

const initialState = new PublicLoginPageState();

const reducer = createReducer(
  initialState,
  on(PublicLoginPageActions.resetState, () => initialState)
);

export function publicLoginPageReducer(state: PublicLoginPageState | undefined, action: Action): PublicLoginPageState {
  return reducer(state, action);
}
