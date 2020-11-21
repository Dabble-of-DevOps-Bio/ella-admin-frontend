import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PaginationResponse } from '@shared/pagination';
import { UserGroup } from '@shared/user-group';

export class AccountUserGroupsPageRootActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Account User Groups Page] Reset State'
  );

  public static loadItems = createAction(
    '[Account User Groups Page] Load Items'
  );

  public static loadItemsByParameters = createAction(
    '[Account User Groups Page] Load Items By Parameters',
    props<{ page?: number, perPage?: number, desc?: boolean }>()
  );

  public static loadItemsSuccess = createAction(
    '[Account User Groups Page] Load Items Success',
    props<{ response: PaginationResponse<UserGroup> }>()
  );

  public static loadItemsFailure = createAction(
    '[Account User Groups Page] Load Items Failure',
    props<{ response: HttpErrorResponse }>()
  );

  public static deleteUserGroup = createAction(
    '[Account User Groups Page] Delete User Group',
    props<{ modalID: string, id: number }>()
  );

  public static deleteUserGroupSuccess = createAction(
    '[Account User Groups Page] Delete User Group Success'
  );

  public static deleteUserGroupFailure = createAction(
    '[Account User Groups Page] Delete User Group Failure'
  );
  /* tslint:enable:typedef */
}
