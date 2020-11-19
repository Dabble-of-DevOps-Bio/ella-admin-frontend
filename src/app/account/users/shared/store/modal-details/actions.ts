import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '@shared/user';

export class AccountUsersModalDetailsActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Account Profile Page - Modal Change Details] Reset State'
  );

  public static initModal = createAction(
    '[Account Profile Page - Modal Change Details] Init Modal'
  );

  public static prefillForm = createAction(
    '[Account Profile Page - Modal Change Details] Prefill Form',
    props<{ profile: User }>()
  );

  public static update = createAction(
    '[Account Profile Page - Modal Change Details] Update',
    props<{ modalID: string }>()
  );

  public static updateSuccess = createAction(
    '[Account Profile Page - Modal Change Details] Update Success',
    props<{ response: User }>()
  );

  public static updateFailure = createAction(
    '[Account Profile Page - Modal Change Details] Update Failure',
    props<{ response: HttpErrorResponse }>()
  );
  /* tslint:enable:typedef */
}
