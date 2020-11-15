import { RouterReducerState } from '@ngrx/router-store';
import { PublicLoginPageState } from '@app/public/login/shared/store';
import { UserState } from '@shared/user';
import { AccountUsersPageState } from '@app/account/users/shared/store';
import { PublicChangePasswordPageState } from '@app/public/change-password/shared/store';
import { AuthState } from '@shared/auth';

export class AppState {
  public router: RouterReducerState<any>;
  public publicLoginPage?: PublicLoginPageState;
  public authState?: AuthState;
  public userState?: UserState;
  public accountUsersPage?: AccountUsersPageState;
  public publicChangePasswordPage?: PublicChangePasswordPageState;
}
