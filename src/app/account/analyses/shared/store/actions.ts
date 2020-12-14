import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Analysis } from '@shared/analysis';
import { AnalysisSortField } from '@shared/analysis/enums';
import { PaginationResponse } from '@shared/pagination';

export class AccountAnalysesPageActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Account Analyses Page] Reset State'
  );

  public static loadItems = createAction(
    '[Account Analyses Page] Load Items'
  );

  public static loadItemsByParameters = createAction(
    '[Account Analyses Page] Load Items By Parameters',
    props<{ page?: number, perPage?: number, orderBy?: AnalysisSortField, desc?: boolean }>()
  );

  public static loadItemsSuccess = createAction(
    '[Account Analyses Page] Load Items Success',
    props<{ response: PaginationResponse<Analysis> }>()
  );

  public static loadItemsFailure = createAction(
    '[Account Analyses Page] Load Items Failure',
    props<{ response: HttpErrorResponse }>()
  );
  /* tslint:enable:typedef */
}
