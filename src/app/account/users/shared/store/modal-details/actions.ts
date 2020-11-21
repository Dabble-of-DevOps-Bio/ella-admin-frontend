import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '@shared/user';

export class AccountUsersModalDetailsActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Account Users Page - Modal Change Details] Reset State'
  );

  public static initModal = createAction(
    '[Account Users Page - Modal Change Details] Init Modal',
    props<{ id: number }>()
  );

  public static prefillForm = createAction(
    '[Account Users Page - Modal Change Details] Prefill Form',
    props<{ user: User }>()
  );

  public static save = createAction(
    '[Account Users Page - Modal Change Details] Save',
    props<{ modalID: string }>()
  );

  public static create = createAction(
    '[Account Users Page - Modal Change Details] Create',
    props<{ modalID: string }>()
  );

  public static update = createAction(
    '[Account Users Page - Modal Change Details] Update',
    props<{ modalID: string }>()
  );

  public static saveSuccess = createAction(
    '[Account Users Page - Modal Change Details] Save Success',
    props<{ response: User }>()
  );

  public static saveFailure = createAction(
    '[Account Users Page - Modal Change Details] Save Failure',
    props<{ response: HttpErrorResponse }>()
  );

  public static openDetailsDialog = createAction(
    '[Account Users Page] Open Details Dialog'
  );
  /* tslint:enable:typedef */
}
