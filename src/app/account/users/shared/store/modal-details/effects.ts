import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountUsersModalDetailsActions } from './actions';
import { withLatestFrom, filter, switchMap, map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AccountUsersModalDetailsSelectors } from './selectors';
import { UserService, UpdateUserRequest } from '@shared/user';
import { ModalActions, ModalService } from '@shared/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountUsersPageRootActions, AccountUsersPageRootSelectors } from '../root';
import { AccountUsersModalDetailsComponent } from '../../components/modal-details/modal-details.component';
import { NotificationActions } from '@shared/notification';
import { UserGroupService } from '@shared/user-group';
import { UserGroupSortField } from '@shared/user-group/enums';

@Injectable()
export class AccountUsersModalDetailsEffects {
  public initModal$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalDetailsActions.initModal),
      mergeMap(({ id }) => this.store.select(AccountUsersPageRootSelectors.item, id)),
      mergeMap((user) => [
        AccountUsersModalDetailsActions.prefillForm({ user }),
        AccountUsersModalDetailsActions.loadGroups()
      ])
    )
  );

  public save$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalDetailsActions.save),
      withLatestFrom(
        this.store.select(AccountUsersModalDetailsSelectors.formState)
      ),
      filter(([_, formState]) => formState.isValid),
      map(([{ modalID }, formState]) => {
        if (formState.value.id === null) {
          return AccountUsersModalDetailsActions.create({ modalID });
        } else {
          return AccountUsersModalDetailsActions.update({ modalID });
        }
      })
    )
  );

  public create$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalDetailsActions.create),
      withLatestFrom(
        this.store.select(AccountUsersModalDetailsSelectors.formState)
      ),
      switchMap(([{ modalID }, formState]) => {
        const updateRequest = new UpdateUserRequest({ ...formState.value });

        return this.userService
          .create(updateRequest)
          .pipe(
            mergeMap((response) => [
              AccountUsersModalDetailsActions.saveSuccess({ response }),
              ModalActions.changeDisableClose({ modalID, isDisableClose: false }),
              ModalActions.closeAll(),
            ]),
            catchError((response: HttpErrorResponse) => [AccountUsersModalDetailsActions.saveFailure({ response })])
          );
      })
    )
  );

  public update$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalDetailsActions.update),
      withLatestFrom(
        this.store.select(AccountUsersModalDetailsSelectors.formState)
      ),
      switchMap(([{ modalID }, formState]) => {
        const updateRequest = new UpdateUserRequest({ ...formState.value });

        return this.userService
          .update(updateRequest)
          .pipe(
            mergeMap((response) => [
              AccountUsersModalDetailsActions.saveSuccess({ response }),
              ModalActions.changeDisableClose({ modalID, isDisableClose: false }),
              ModalActions.closeAll(),
            ]),
            catchError((response: HttpErrorResponse) => [AccountUsersModalDetailsActions.saveFailure({ response })])
          );
      })
    )
  );

  public saveSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalDetailsActions.saveSuccess),
      mergeMap(() => [
        NotificationActions.showSuccess({
          translationKey: 'SHARED.NOTIFICATIONS.TEXT_SUCCESS'
        }),
        AccountUsersPageRootActions.loadItemsByParameters({}),
      ])
    )
  );

  public saveFailure$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalDetailsActions.saveFailure),
      map((response) => NotificationActions.showError({
        translationKey: (response.response.error.name !== undefined) ? response.response.error.name[0] : 'SHARED.NOTIFICATIONS.TEXT_ERROR'
      }))
    )
  );

  public openDetailsDialog$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalDetailsActions.openDetailsDialog),
      tap(() => {
        this.modalService.open(AccountUsersModalDetailsComponent, {
          panelClass: 'users-modal-panel',
          data: { id: null }
        });
      })
    ),
    { dispatch: false }
  );

  public loadGroups$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalDetailsActions.loadGroups),
      switchMap(() => {
        return this.userGroupService
          .search({ all: true, sortBy: UserGroupSortField.NAME })
          .pipe(
            mergeMap((response) => [
              AccountUsersModalDetailsActions.loadGroupsSuccess({ response }),
            ]),
            catchError((response: HttpErrorResponse) => [AccountUsersModalDetailsActions.loadGroupsFailure({ response })])
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService,
    private modalService: ModalService,
    private userGroupService: UserGroupService,
  ) { }
}
