import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NotificationActions } from './actions';
import { NotificationService } from '../notification.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationEffects {
  public showSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.showSuccess),
      tap((action) => {
        const translation = this.translateService.instant(action.translationKey, action.translationParams);

        this.notificationService.success(translation, action.typeClass);
      })
    ),
    { dispatch: false }
  );

  public showWarning$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.showWarning),
      tap((action) => {
        const translation = this.translateService.instant(action.translationKey, action.translationParams);

        this.notificationService.warning(translation, action.typeClass);
      })
    ),
    { dispatch: false }
  );

  public showError$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.showError),
      tap((action) => {
        const translation = this.translateService.instant(action.translationKey, action.translationParams);

        this.notificationService.error(translation, action.typeClass);
      })
    ),
    { dispatch: false }
  );

  public showInfo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.showInfo),
      tap((action) => {
        const translation = this.translateService.instant(action.translationKey, action.translationParams);

        this.notificationService.success(translation, action.typeClass);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private notificationService: NotificationService,
    private translateService: TranslateService
  ) { }
}
