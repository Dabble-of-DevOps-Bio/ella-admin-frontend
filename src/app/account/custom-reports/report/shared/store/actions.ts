import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CustomReport } from '@shared/custom-report';

export class AccountCustomReportsReportPageActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Account Custom Reports Report Page] Reset State'
  );

  public static initPage = createAction(
    '[Account Custom Reports Report Page] Init Page'
  );

  public static loadData = createAction(
    '[Account Custom Reports Report Page] Load Data',
    props<{ id: number }>()
  );

  public static loadDataSuccess = createAction(
    '[Account Custom Reports Report Page] Load Data Success',
    props<{ response: CustomReport }>()
  );

  public static loadDataFailure = createAction(
    '[Account Custom Reports Report Page] Load Data Failure',
    props<{ response: HttpErrorResponse }>()
  );

  public static save = createAction(
    '[Account Custom Reports Report Page] Save Changes'
  );

  public static saveSuccess = createAction(
    '[Account Custom Reports Report Page] Save Changes Success'
  );

  public static saveFailure = createAction(
    '[Account Custom Reports Report Page] Save Changes Failure',
    props<{ response: HttpErrorResponse }>()
  );
  /* tslint:enable:typedef */
}
