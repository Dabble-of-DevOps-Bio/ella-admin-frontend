import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export class PublicForgotPasswordPageActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Public Forgot Password Page] Reset State'
  );

  public static forgotPassword = createAction(
    '[Public Forgot Password Page] Forgot Password'
  );

  public static forgotPasswordSuccess = createAction(
    '[Public Forgot Password Page] Forgot Password Success'
  );

  public static forgotPasswordFailed = createAction(
    '[Public Forgot Password Page] Forgot Password Failed',
    props<{ response: HttpErrorResponse }>()
  );
  /* tslint:enable:typedef */
}
