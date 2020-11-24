import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export class PublicLoginPageActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Public Login Page] Reset State'
  );

  public static login = createAction(
    '[Public Login Page] Login'
  );
  /* tslint:enable:typedef */
}
