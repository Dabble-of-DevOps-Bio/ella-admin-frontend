import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '@shared/user';

export class AccountUsersModalPasswordActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Account Users Page - Modal Change Password] Reset State'
  );

  public static initModal = createAction(
    '[Account Users Page - Modal Change Password] Init Modal',
    props<{ id: number }>()
  );

  public static save = createAction(
    '[Account Users Page - Modal Change Password] Save',
    props<{ modalID: string }>()
  );

  public static saveSuccess = createAction(
    '[Account Users Page - Modal Change Password] Save Success',
    props<{ response: User }>()
  );

  public static saveFailure = createAction(
    '[Account Users Page - Modal Change Password] Save Failure',
    props<{ response: HttpErrorResponse }>()
  );
  /* tslint:enable:typedef */
}
