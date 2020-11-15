import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginCredentials, LoginResponse, User } from '../models';

export class UserActions {
  /* tslint:disable:typedef */
  public static login = createAction(
    '[User] Login',
    props<{ credentials: LoginCredentials }>()
  );

  public static loginSuccess = createAction(
    '[User] Login Success',
    props<{ response: LoginResponse }>()
  );

  public static loginFailure = createAction(
    '[User] Login Failure',
    props<{ response: HttpErrorResponse }>()
  );

  public static logout = createAction(
    '[User] Logout'
  );

  public static refreshProfile = createAction(
    '[User] Refresh User Profile'
  );

  public static refreshProfileSuccess = createAction(
    '[User] Refresh User Profile Success',
    props<{ response: User }>()
  );

  public static refreshProfileFailure = createAction(
    '[User] Refresh User Profile Failure',
    props<{ response: HttpErrorResponse }>()
  );

  public static removeProfile = createAction(
    '[User] Remove User Profile'
  );

  public static getLanguage = createAction(
    '[User] Get Language'
  );
  /* tslint:enable:typedef */
}
