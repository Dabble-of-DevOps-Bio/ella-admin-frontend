import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountUsersModalDetailsActions } from './actions';
import { withLatestFrom, filter, switchMap, map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AccountUsersModalDetailsSelectors } from './selectors';
import { UserService, UserSelectors, User } from '@shared/user';
import { ModalActions, ModalComponent, ModalService } from '@shared/modal';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountUsersPageRootSelectors } from '../root';

@Injectable()
export class AccountUsersModalDetailsEffects {
  public initModal$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalDetailsActions.initModal),
      mergeMap(({ id }) => this.store.select(AccountUsersPageRootSelectors.item, id)),
      map((user) => AccountUsersModalDetailsActions.prefillForm({ user }))
    )
  );

  public update$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalDetailsActions.update),
      withLatestFrom(
        this.store.select(AccountUsersModalDetailsSelectors.formState)
      ),
      filter(([_, formState]) => formState.isValid),
      switchMap(([{ modalID }, formState]) => {
        const updateRequest = new User({
          firstName: formState.value.firstName,
          lastName: formState.value.lastName,
          email: formState.value.email
        });

        return this.userService
          .update(updateRequest)
          .pipe(
            mergeMap((response) => [
              AccountUsersModalDetailsActions.updateSuccess({ response: updateRequest }),
              ModalActions.changeDisableClose({ modalID, isDisableClose: false }),
              ModalActions.closeByID({ modalID })
            ]),
            catchError((response: HttpErrorResponse) => [AccountUsersModalDetailsActions.updateFailure({ response })])
          );
      })
    )
  );

  public updateSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalDetailsActions.updateSuccess),
      tap(() => {
        this.modalService.openModal(ModalComponent, {
          title: this.translateService.instant('ACCOUNT.USERS.MODAL_DETAILS.MODAL_SUCCESS.TEXT_TITLE'),
          button: this.translateService.instant('ACCOUNT.USERS.MODAL_DETAILS.MODAL_SUCCESS.TEXT_CONTINUE')
        });
      })
    ),
    { dispatch: false }
  );

  public updateFailure$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalDetailsActions.updateFailure),
      map(({ response }) => ModalActions.openServerErrorModal({ response }))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService,
    private modalService: ModalService,
    private translateService: TranslateService
  ) { }
}
