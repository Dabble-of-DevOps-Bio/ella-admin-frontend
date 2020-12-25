import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { GenePanel } from '@shared/gene-panel';
import { GenePanelSortField } from '@shared/gene-panel/enums';
import { PaginationResponse } from '@shared/pagination';

export class AccountGenePanelsPageRootActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Account Gen Panels Page] Reset State'
  );

  public static loadItems = createAction(
    '[Account Gen Panels Page] Load Items'
  );

  public static loadItemsByParameters = createAction(
    '[Account Gen Panels Page] Load Items By Parameters',
    props<{ page?: number, perPage?: number, orderBy?: GenePanelSortField, desc?: boolean }>()
  );

  public static loadItemsSuccess = createAction(
    '[Account Gen Panels Page] Load Items Success',
    props<{ response: PaginationResponse<GenePanel> }>()
  );

  public static loadItemsFailure = createAction(
    '[Account Gen Panels Page] Load Items Failure',
    props<{ response: HttpErrorResponse }>()
  );
  /* tslint:enable:typedef */
}
