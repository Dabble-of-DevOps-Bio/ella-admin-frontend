import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountUsersModalDetailsActions } from './actions';
import { withLatestFrom, filter, switchMap, map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AccountUsersModalDetailsSelectors } from './selectors';
import { UserService, User } from '@shared/user';
import { ModalActions, ModalComponent, ModalService } from '@shared/modal';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountUsersPageRootActions, AccountUsersPageRootSelectors } from '../root';
import { AccountUsersModalDetailsComponent } from '../../components/modal-details/modal-details.component';

@Injectable()
export class AccountUsersModalDetailsEffects {
  public initModal$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalDetailsActions.initModal),
      mergeMap(({ id }) => this.store.select(AccountUsersPageRootSelectors.item, id)),
      map((user) => AccountUsersModalDetailsActions.prefillForm({ user }))
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
        const updateRequest = new User({ ...formState.value });

        return this.userService
          .create(updateRequest)
          .pipe(
            mergeMap((response) => [
              AccountUsersModalDetailsActions.saveSuccess({ response: updateRequest }),
              ModalActions.changeDisableClose({ modalID, isDisableClose: false }),
              ModalActions.closeByID({ modalID }),
              AccountUsersPageRootActions.loadItemsByParameters({}),
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
        const updateRequest = new User({ ...formState.value });

        return this.userService
          .update(updateRequest)
          .pipe(
            mergeMap((response) => [
              AccountUsersModalDetailsActions.saveSuccess({ response: updateRequest }),
              ModalActions.changeDisableClose({ modalID, isDisableClose: false }),
              ModalActions.closeByID({ modalID }),
              AccountUsersPageRootActions.loadItemsByParameters({}),
            ]),
            catchError((response: HttpErrorResponse) => [AccountUsersModalDetailsActions.saveFailure({ response })])
          );
      })
    )
  );

  public saveSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalDetailsActions.saveSuccess),
      tap(() => {
        this.modalService.openModal(ModalComponent, {
          title: this.translateService.instant('ACCOUNT.USERS.MODAL_DETAILS.MODAL_SUCCESS.TEXT_TITLE'),
          button: this.translateService.instant('ACCOUNT.USERS.MODAL_DETAILS.MODAL_SUCCESS.TEXT_OK')
        });
      })
    ),
    { dispatch: false }
  );

  public saveFailure$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalDetailsActions.saveFailure),
      map(({ response }) => ModalActions.openServerErrorModal({ response }))
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

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService,
    private modalService: ModalService,
    private translateService: TranslateService
  ) { }
}
