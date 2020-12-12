import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { UserGroup } from '@shared/user-group';
import { GenPanel } from '@shared/gen-panel';
import { PaginationResponse } from '@shared/pagination';

export class AccountGenPanelsModalDetailsActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Account Gen Panels Page - Modal Change Details] Reset State'
  );

  public static initModal = createAction(
    '[Account Gen Panels Page - Modal Change Details] Init Modal',
    props<{ id: number }>()
  );

  public static prefillForm = createAction(
    '[Account Gen Panels Page - Modal Change Details] Prefill Form',
    props<{ genPanel: GenPanel }>()
  );

  public static save = createAction(
    '[Account Gen Panels Page - Modal Change Details] Save',
    props<{ modalID: string }>()
  );

  public static saveSuccess = createAction(
    '[Account Gen Panels Page - Modal Change Details] Save Success',
    props<{ response: UserGroup }>()
  );

  public static saveFailure = createAction(
    '[Account Gen Panels Page - Modal Change Details] Save Failure',
    props<{ response: HttpErrorResponse }>()
  );

  public static openDetailsDialog = createAction(
    '[Account Gen Panels Page] Open Details Dialog'
  );

  public static loadItems = createAction(
    '[Admin Gen Panels Page] Load Items'
  );

  public static loadItemsByParameters = createAction(
    '[Admin Gen Panels Page] Load Items By Parameters'
  );

  public static loadNextPage = createAction(
    '[Admin Gen Panels Page] Load Next Page'
  );

  public static loadItemsSuccess = createAction(
    '[Admin Gen Panels Page] Load Items Success',
    props<{ response: PaginationResponse<UserGroup> }>()
  );

  public static loadItemsFailure = createAction(
    '[Admin Gen Panels Page] Load Items Failure',
    props<{ response: HttpErrorResponse }>()
  );
  /* tslint:enable:typedef */
}
