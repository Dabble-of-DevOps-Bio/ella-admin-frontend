import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ModalActions } from './actions';
import { ModalService } from '../modal.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ModalComponent } from '../modal.component';
import { isArray } from 'lodash';

@Injectable()
export class ModalEffects {
  public closeByID$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ModalActions.closeByID),
      tap((action) => this.modalService.closeByID(action.modalID))
    ),
    { dispatch: false }
  );

  public closeAll$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ModalActions.closeAll),
      tap(() => this.modalService.closeAll())
    ),
    { dispatch: false }
  );

  public changeDisableClose$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ModalActions.changeDisableClose),
      tap((action) => this.modalService.changeDisableClose(action.modalID, action.isDisableClose))
    ),
    { dispatch: false }
  );

  public openServerErrorModal$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ModalActions.openServerErrorModal),
      tap(({ response }) => {
        if (response.status === 409) {
          this.modalService.openModal(ModalComponent, {
            title: response.error.message,
            button: this.translateService.instant('SHARED.MODAL.BUTTON_OK')
          });
        } else if (response.status === 422) {
          let title = response.error.message;

          if (response.error.errors) {
            const entries = Object.entries(response.error.errors)[0][1];
            title = (isArray(entries)) ? entries[0].message : entries;
          }

          this.modalService.openModal(ModalComponent, {
            title,
            button: this.translateService.instant('SHARED.MODAL.BUTTON_OK')
          });
        } else {
          this.modalService.openModal(ModalComponent, {
            title: this.translateService.instant('SHARED.MODAL_FAILURE.TEXT_TITLE'),
            content: this.translateService.instant('SHARED.MODAL_FAILURE.TEXT_CONTENT'),
            button: this.translateService.instant('SHARED.MODAL.BUTTON_OK')
          });
        }
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private modalService: ModalService,
    private translateService: TranslateService
  ) { }
}
