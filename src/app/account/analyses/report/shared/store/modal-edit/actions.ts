import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { AnalysisVariantResult } from '@shared/analysis';

export class AccountAnalysesReportModalEditActions {
  /* tslint:disable:typedef */
  public static resetState = createAction(
    '[Account Analyses Report - Modal Change Details] Reset State'
  );

  public static prefillForm = createAction(
    '[Account Analyses Report - Modal Change Details] Prefill Form',
    props<{ result: AnalysisVariantResult }>()
  );

  public static save = createAction(
    '[Account Analyses Report - Modal Change Details] Save',
    props<{ modalID: string }>()
  );

  public static saveSuccess = createAction(
    '[Account Analyses Report - Modal Change Details] Save Success',
    props<{ result: AnalysisVariantResult }>()
  );

  public static saveFailure = createAction(
    '[Account Analyses Report - Modal Change Details] Save Failure',
    props<{ response: HttpErrorResponse }>()
  );
  /* tslint:enable:typedef */
}
