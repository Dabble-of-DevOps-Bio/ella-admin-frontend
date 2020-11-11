import { RouterReducerState } from '@ngrx/router-store';
import { PublicLoginPageState } from '@app/public/login/shared/store';

export class AppState {
  public router: RouterReducerState<any>;
  public publicLoginPage?: PublicLoginPageState;
}
