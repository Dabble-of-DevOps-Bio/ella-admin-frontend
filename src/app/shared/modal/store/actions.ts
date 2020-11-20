import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export class ModalActions {
  /* tslint:disable:typedef */
  public static openServerErrorModal = createAction(
    '[Modal] Open Server Error',
    props<{ response: HttpErrorResponse }>()
  );

  public static closeByID = createAction(
    '[Modal] Close by ID',
    props<{ modalID: string }>()
  );

  public static changeDisableClose = createAction(
    '[Modal] Change Disable Close',
    props<{ modalID: string, isDisableClose: boolean }>()
  );

  public static closeAll = createAction(
    '[Modal] Close All'
  );
  /* tslint:enable:typedef */
}
