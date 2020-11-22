import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { UserGroup } from '@shared/user-group';

export class AccountUserGroupsModalDetailsActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Account User Groups Page - Modal Change Details] Reset State'
  );

  public static initModal = createAction(
    '[Account User Groups Page - Modal Change Details] Init Modal',
    props<{ id: number }>()
  );

  public static prefillForm = createAction(
    '[Account User Groups Page - Modal Change Details] Prefill Form',
    props<{ userGroup: UserGroup }>()
  );

  public static save = createAction(
    '[Account User Groups Page - Modal Change Details] Save',
    props<{ modalID: string }>()
  );

  public static create = createAction(
    '[Account User Groups Page - Modal Change Details] Create',
    props<{ modalID: string }>()
  );

  public static update = createAction(
    '[Account User Groups Page - Modal Change Details] Update',
    props<{ modalID: string }>()
  );

  public static saveSuccess = createAction(
    '[Account User Groups Page - Modal Change Details] Save Success',
    props<{ response: UserGroup }>()
  );

  public static saveFailure = createAction(
    '[Account User Groups Page - Modal Change Details] Save Failure',
    props<{ response: HttpErrorResponse }>()
  );

  public static openDetailsDialog = createAction(
    '[Account Users Groups Page] Open Details Dialog'
  );
  /* tslint:enable:typedef */
}
