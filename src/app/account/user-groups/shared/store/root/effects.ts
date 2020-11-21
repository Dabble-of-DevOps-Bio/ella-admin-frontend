import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccountUserGroupsPageRootActions } from './actions';
import { UserGroup, UserGroupService } from '@shared/user-group';
import { PaginationResponse } from '@shared/pagination';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalActions, ModalComponent, ModalService } from '@shared/modal';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AccountUserGroupsPageRootEffects {
  public loadItems$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsPageRootActions.loadItems),
      map(() => {
        return AccountUserGroupsPageRootActions.loadItemsByParameters({});
      })
    )
  );

  public loadItemsByParameters$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsPageRootActions.loadItemsByParameters),
      switchMap((action) => {
        return this.userGroupService
          .search({})
          .pipe(
            map((response: PaginationResponse<UserGroup>) => AccountUserGroupsPageRootActions.loadItemsSuccess({ response })),
            catchError((response: HttpErrorResponse) => [AccountUserGroupsPageRootActions.loadItemsFailure({ response })])
          );
      })
    )
  );

  public deleteUserGroup$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsPageRootActions.deleteUserGroup),
      switchMap(({ id, modalID }) => {
        return this.userGroupService
          .delete(id)
          .pipe(
            mergeMap((response) => [
              AccountUserGroupsPageRootActions.deleteUserGroupSuccess(),
              ModalActions.changeDisableClose({ modalID, isDisableClose: false }),
              ModalActions.closeByID({ modalID })
            ]),
            catchError((response: HttpErrorResponse) => [AccountUserGroupsPageRootActions.deleteUserGroupFailure()])
          );
      })
    )
  );

  public deleteUserGroupSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsPageRootActions.deleteUserGroupSuccess),
      tap(() => {
        this.modalService.openModal(ModalComponent, {
          title: this.translateService.instant('ACCOUNT.USER_GROUPS.MODAL_DELETE.MODAL_SUCCESS.TEXT_TITLE'),
          button: this.translateService.instant('ACCOUNT.USER_GROUPS.MODAL_DELETE.MODAL_SUCCESS.TEXT_OK')
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
