import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CustomReport, CustomReportVariation } from '@shared/custom-report';

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

  public static fillVariations = createAction(
    '[Account Custom Reports Report Page] Fill Variations',
    props<{ variations: Array<CustomReportVariation> }>()
  );

  public static resetGenes = createAction(
    '[Account Custom Reports Report Page] Reset Genes',
    props<{ value: number }>()
  );

  public static fillInterpretation = createAction(
    '[Account Custom Reports Report Page] Fill Interpretation',
    props<{ interpretation: string, result: string }>()
  );

  public static resetVariations = createAction(
    '[Account Custom Reports Report Page] Reset Variations',
    props<{ value: number }>()
  );
  /* tslint:enable:typedef */
}
