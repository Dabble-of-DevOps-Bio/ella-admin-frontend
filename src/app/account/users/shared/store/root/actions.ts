import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PaginationResponse } from '@shared/pagination';
import { User } from '@shared/user';
import { UserSortField } from '@shared/user/enums';

export class AccountUsersPageRootActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Account Users Page] Reset State'
  );

  public static loadItems = createAction(
    '[Account Users Page] Load Items'
  );

  public static loadItemsByParameters = createAction(
    '[Account Users Page] Load Items By Parameters',
    props<{ page?: number, perPage?: number, orderBy?: UserSortField, desc?: boolean }>()
  );

  public static loadItemsSuccess = createAction(
    '[Account Users Page] Load Items Success',
    props<{ response: PaginationResponse<User> }>()
  );

  public static loadItemsFailure = createAction(
    '[Account Users Page] Load Items Failure',
    props<{ response: HttpErrorResponse }>()
  );

  public static deleteUser = createAction(
    '[Account Users Page] Delete User',
    props<{ modalID: string, id: number }>()
  );

  public static deleteUserSuccess = createAction(
    '[Account Users Page] Delete User Success',
    props<{ id: number }>()
  );

  public static deleteUserFailure = createAction(
    '[Account Users Page] Delete User Failure'
  );

  public static resetPassword = createAction(
    '[Account Users Page] Reset Password',
    props<{ modalID: string, email: string }>()
  );

  public static resetPasswordSuccess = createAction(
    '[Account Users Page] Reset Password Success'
  );

  public static resetPasswordFailure = createAction(
    '[Account Users Page] Reset Password Failure'
  );
  /* tslint:enable:typedef */
}
