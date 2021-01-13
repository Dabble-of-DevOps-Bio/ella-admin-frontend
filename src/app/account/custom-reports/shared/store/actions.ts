import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CustomReport, CustomReportSortField } from '@shared/custom-report';
import { PaginationResponse } from '@shared/pagination';

export class AccountCustomReportsPageActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Account Custom Reports Page] Reset State'
  );

  public static loadItems = createAction(
    '[Account Custom Reports Page] Load Items'
  );

  public static loadItemsByParameters = createAction(
    '[Account Custom Reports Page] Load Items By Parameters',
    props<{ page?: number, perPage?: number, orderBy?: CustomReportSortField, desc?: boolean }>()
  );

  public static loadItemsSuccess = createAction(
    '[Account Custom Reports Page] Load Items Success',
    props<{ response: PaginationResponse<CustomReport> }>()
  );

  public static loadItemsFailure = createAction(
    '[Account Custom Reports Page] Load Items Failure',
    props<{ response: HttpErrorResponse }>()
  );
  /* tslint:enable:typedef */
}
