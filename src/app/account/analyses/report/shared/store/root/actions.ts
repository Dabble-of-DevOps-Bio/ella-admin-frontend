import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AnalysisPatientData, AnalysisVariantReport } from '@shared/analysis';

export class AccountAnalysesReportPageRootActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Account Analyses Report Page - Root] Reset State'
  );

  public static initPage = createAction(
    '[Account Analyses Report Page - Root] Init Page - Root'
  );

  public static loadPatientData = createAction(
    '[Account Analyses Report Page - Root] Load Patient Data',
    props<{ id: number }>()
  );

  public static loadPatientDataSuccess = createAction(
    '[Account Analyses Report Page - Root] Load Patient Data Success',
    props<{ response: AnalysisPatientData }>()
  );

  public static loadPatientDataFailure = createAction(
    '[Account Analyses Report Page - Root] Load Patient Data Failure',
    props<{ response: HttpErrorResponse }>()
  );

  public static loadVariantReport = createAction(
    '[Account Analyses Report Page - Root] Load Variant Report',
    props<{ id: number }>()
  );

  public static loadVariantReportSuccess = createAction(
    '[Account Analyses Report Page - Root] Load Variant Report Success',
    props<{ response: AnalysisVariantReport }>()
  );

  public static loadVariantReportFailure = createAction(
    '[Account Analyses Report Page - Root] Load Variant Report Failure',
    props<{ response: HttpErrorResponse }>()
  );

  public static save = createAction(
    '[Account Analyses Report Page - Root] Save Changes'
  );

  public static deleteItem = createAction(
    '[Account Analyses Report Page - Root] Delete Item',
    props<{ modalID: string, index: number }>()
  );
  /* tslint:enable:typedef */
}
