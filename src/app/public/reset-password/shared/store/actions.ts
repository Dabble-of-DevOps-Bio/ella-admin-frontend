import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export class PublicResetPasswordPageActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Public Reset Password Page] Reset State'
  );

  public static resetPassword = createAction(
    '[Public Reset Password Page] Reset Password'
  );

  public static resetPasswordSuccess = createAction(
    '[Public Reset Password Page] Reset Password Success'
  );

  public static resetPasswordFailed = createAction(
    '[Public Reset Password Page] Reset Password Failed',
    props<{ response: HttpErrorResponse }>()
  );

  public static checkToken = createAction(
    '[Public Reset Password Page] Check Token'
  );

  public static checkTokenSuccess = createAction(
    '[Public Reset Password Page] Check Token Success'
  );

  public static checkTokenFailed = createAction(
    '[Public Reset Password Page] Check Token Failed',
    props<{ response: HttpErrorResponse }>()
  );
  /* tslint:enable:typedef */
}
