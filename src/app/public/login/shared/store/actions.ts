import { createAction } from '@ngrx/store';

export class PublicLoginPageActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Public Login Page] Reset State'
  );

  public static tryLogin = createAction(
    '[Public Login Page] Try Login'
  );
  /* tslint:enable:typedef */
}
