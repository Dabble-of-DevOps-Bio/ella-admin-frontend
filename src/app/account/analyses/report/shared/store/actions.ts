import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AnalysisPatientData, AnalysisVariantReport } from '@shared/analysis';

export class AccountAnalysesReportPageActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Account Analyses Report Page] Reset State'
  );

  public static initPage = createAction(
    '[Account Analyses Report Page] Init Page'
  );

  public static loadPatientData = createAction(
    '[Account Analyses Report Page] Load Patient Data',
    props<{ id: number }>()
  );

  public static loadPatientDataSuccess = createAction(
    '[Account Analyses Report Page] Load Patient Data Success',
    props<{ response: AnalysisPatientData }>()
  );

  public static loadPatientDataFailure = createAction(
    '[Account Analyses Report Page] Load Patient Data Failure',
    props<{ response: HttpErrorResponse }>()
  );

  public static loadVariantReport = createAction(
    '[Account Analyses Report Page] Load Variant Report',
    props<{ id: number }>()
  );

  public static loadVariantReportSuccess = createAction(
    '[Account Analyses Report Page] Load Variant Report Success',
    props<{ response: AnalysisVariantReport }>()
  );

  public static loadVariantReportFailure = createAction(
    '[Account Analyses Report Page] Load Variant Report Failure',
    props<{ response: HttpErrorResponse }>()
  );

  public static save = createAction(
    '[Account Analyses Report Page] Save Changes'
  );
  /* tslint:enable:typedef */
}
