import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountUserGroupsModalDetailsActions } from './actions';
import { withLatestFrom, filter, switchMap, map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AccountUserGroupsModalDetailsSelectors } from './selectors';
import { ModalActions, ModalService } from '@shared/modal';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountUserGroupsPageRootActions, AccountUserGroupsPageRootSelectors } from '../root';
import { AccountUserGroupsModalDetailsComponent } from '../../components/modal-details/modal-details.component';
import { UserGroup, UserGroupService } from '@shared/user-group';
import { NotificationActions } from '@shared/notification';

@Injectable()
export class AccountUserGroupsModalDetailsEffects {
  public initModal$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsModalDetailsActions.initModal),
      mergeMap(({ id }) => this.store.select(AccountUserGroupsPageRootSelectors.item, id)),
      map((userGroup) => AccountUserGroupsModalDetailsActions.prefillForm({ userGroup }))
    )
  );

  public save$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsModalDetailsActions.save),
      withLatestFrom(
        this.store.select(AccountUserGroupsModalDetailsSelectors.formState)
      ),
      filter(([_, formState]) => formState.isValid),
      map(([{ modalID }, formState]) => {
        if (formState.value.id === null) {
          return AccountUserGroupsModalDetailsActions.create({ modalID });
        } else {
          return AccountUserGroupsModalDetailsActions.update({ modalID });
        }
      })
    )
  );

  public create$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsModalDetailsActions.create),
      withLatestFrom(
        this.store.select(AccountUserGroupsModalDetailsSelectors.formState)
      ),
      switchMap(([{ modalID }, formState]) => {
        const updateRequest = new UserGroup({ ...formState.value });

        return this.userGroupService
          .create(updateRequest)
          .pipe(
            mergeMap((response) => [
              AccountUserGroupsModalDetailsActions.saveSuccess({ response: updateRequest }),
              ModalActions.changeDisableClose({ modalID, isDisableClose: false }),
              ModalActions.closeByID({ modalID }),
              AccountUserGroupsPageRootActions.loadItemsByParameters({}),
            ]),
            catchError((response: HttpErrorResponse) => [AccountUserGroupsModalDetailsActions.saveFailure({ response })])
          );
      })
    )
  );

  public update$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsModalDetailsActions.update),
      withLatestFrom(
        this.store.select(AccountUserGroupsModalDetailsSelectors.formState)
      ),
      switchMap(([{ modalID }, formState]) => {
        const updateRequest = new UserGroup({ ...formState.value });

        return this.userGroupService
          .update(updateRequest)
          .pipe(
            mergeMap((response) => [
              AccountUserGroupsModalDetailsActions.saveSuccess({ response: updateRequest }),
              ModalActions.changeDisableClose({ modalID, isDisableClose: false }),
              ModalActions.closeAll(),
            ]),
            catchError((response: HttpErrorResponse) => [AccountUserGroupsModalDetailsActions.saveFailure({ response })])
          );
      })
    )
  );

  public saveSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsModalDetailsActions.saveSuccess),
      mergeMap(() => [
        NotificationActions.showSuccess({
          translationKey: 'SHARED.NOTIFICATIONS.TEXT_SUCCESS'
        }),
        AccountUserGroupsPageRootActions.loadItemsByParameters({}),
      ])
    )
  );

  public saveFailure$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsModalDetailsActions.saveFailure),
      map((response) => NotificationActions.showError({
        translationKey: (response.response.error.name !== undefined) ? response.response.error.name[0] : 'SHARED.NOTIFICATIONS.TEXT_ERROR'
      }))
    )
  );

  public openDetailsDialog$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsModalDetailsActions.openDetailsDialog),
      tap(() => {
        this.modalService.open(AccountUserGroupsModalDetailsComponent, {
          panelClass: 'user-groups-modal-panel',
          data: { id: null }
        });
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userGroupService: UserGroupService,
    private modalService: ModalService,
    private translateService: TranslateService
  ) { }
}
