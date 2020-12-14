import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { GenPanel } from '@shared/gen-panel';
import { GenPanelSortField } from '@shared/gen-panel/enums';
import { PaginationResponse } from '@shared/pagination';

export class AccountGenPanelsPageRootActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Account Gen Panels Page] Reset State'
  );

  public static loadItems = createAction(
    '[Account Gen Panels Page] Load Items'
  );

  public static loadItemsByParameters = createAction(
    '[Account Gen Panels Page] Load Items By Parameters',
    props<{ page?: number, perPage?: number, orderBy?: GenPanelSortField, desc?: boolean }>()
  );

  public static loadItemsSuccess = createAction(
    '[Account Gen Panels Page] Load Items Success',
    props<{ response: PaginationResponse<GenPanel> }>()
  );

  public static loadItemsFailure = createAction(
    '[Account Gen Panels Page] Load Items Failure',
    props<{ response: HttpErrorResponse }>()
  );
  /* tslint:enable:typedef */
}
