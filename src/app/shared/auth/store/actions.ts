import { AuthCredentials, AuthResponse } from '../models';
import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export class AuthActions {
  /* tslint:disable:typedef */
  public static authorize = createAction(
    '[Auth] Authorize',
    props<{ credentials: AuthCredentials }>()
  );

  public static unauthorize = createAction(
    '[Auth] Unauthorize'
  );

  public static authorizeSuccess = createAction(
    '[Auth] Authorize Success',
    props<{ response: AuthResponse }>()
  );

  public static authorizeFailure = createAction(
    '[Auth] Authorize Failure',
    props<{ response: HttpErrorResponse }>()
  );

  public static updateToken = createAction(
    '[Auth] Update Token',
    props<{ token: string }>()
  );

  public static refreshToken = createAction(
    '[Auth] Refresh Token'
  );

  public static refreshTokenFailure = createAction(
    '[Auth] Refresh Token Failure',
    props<{ response: HttpErrorResponse }>()
  );

  public static frontendAuthorize = createAction(
    '[Auth] Client App Authorize'
  );

  public static frontendAuthorizeSuccess = createAction(
    '[Auth] Client App Authorize Success'
  );

  public static frontendAuthorizeFailure = createAction(
    '[Auth] Client App Authorize Failure',
    props<{ response: HttpErrorResponse }>()
  );
  /* tslint:enable:typedef */
}
