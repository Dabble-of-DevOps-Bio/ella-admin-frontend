import { createAction } from '@ngrx/store';

export class PublicLoginPageActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[PublicLoginPage] Reset State'
  );
  /* tslint:enable:typedef */
}
