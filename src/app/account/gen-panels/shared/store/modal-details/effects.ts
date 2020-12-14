import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { AccountGenPanelsModalDetailsActions } from './actions';
import { withLatestFrom, filter, switchMap, map, mergeMap, catchError, tap, concatMap, take } from 'rxjs/operators';
import { AccountGenPanelsModalDetailsSelectors } from './selectors';
import { ModalActions, ModalService } from '@shared/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountGenPanelsPageRootActions, AccountGenPanelsPageRootSelectors } from '../root';
import { AccountGenPanelsModalDetailsComponent } from '../../components/modal-details/modal-details.component';
import { NotificationActions } from '@shared/notification';
import { GenPanel, GenPanelService } from '@shared/gen-panel';
import { UserGroup, UserGroupService } from '@shared/user-group';
import { PaginationResponse } from '@shared/pagination';
import { unbox } from 'ngrx-forms';

@Injectable()
export class AccountGenPanelsModalDetailsEffects {
  public initModal$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenPanelsModalDetailsActions.initModal),
      mergeMap(({ id }) => this.store.select(AccountGenPanelsPageRootSelectors.item, id)),
      map((genPanel) => AccountGenPanelsModalDetailsActions.prefillForm({ genPanel }))
    )
  );

  public save$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenPanelsModalDetailsActions.save),
      withLatestFrom(
        this.store.select(AccountGenPanelsModalDetailsSelectors.formState)
      ),
      filter(([_, formState]) => formState.isValid),
      switchMap(([{ modalID }, formState]) => {
        const updateRequest = new GenPanel({
          id: formState.value.id,
          groups: unbox(formState.value.groups)
        });

        return this.genPanelService
          .update(updateRequest)
          .pipe(
            mergeMap((response) => [
              AccountGenPanelsModalDetailsActions.saveSuccess({ response: updateRequest }),
              ModalActions.changeDisableClose({ modalID, isDisableClose: false }),
              ModalActions.closeAll(),
            ]),
            catchError((response: HttpErrorResponse) => [AccountGenPanelsModalDetailsActions.saveFailure({ response })])
          );
      })
    )
  );

  public saveSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenPanelsModalDetailsActions.saveSuccess),
      mergeMap(() => [
        NotificationActions.showSuccess({
          translationKey: 'SHARED.NOTIFICATIONS.TEXT_SUCCESS'
        }),
        AccountGenPanelsPageRootActions.loadItemsByParameters({}),
      ])
    )
  );

  public saveFailure$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenPanelsModalDetailsActions.saveFailure),
      map((response) => NotificationActions.showError({
        translationKey: (response.response.error.name !== undefined) ? response.response.error.name[0] : 'SHARED.NOTIFICATIONS.TEXT_ERROR'
      }))
    )
  );

  public openDetailsDialog$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenPanelsModalDetailsActions.openDetailsDialog),
      tap(() => {
        this.modalService.open(AccountGenPanelsModalDetailsComponent, {
          panelClass: 'gen-panels-modal-panel',
          data: { id: null }
        });
      })
    ),
    { dispatch: false }
  );

  public loadItems$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenPanelsModalDetailsActions.loadItems),
      map((action) => AccountGenPanelsModalDetailsActions.loadItemsByParameters())
    )
  );

  public loadNextPage$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenPanelsModalDetailsActions.loadNextPage),
      mergeMap((action) => forkJoin([
        [action],
        this.store.select(AccountGenPanelsModalDetailsSelectors.hasMoreItems).pipe(take(1))
      ])),
      filter(([_, hasMoreItems]) => hasMoreItems),
      map(([action]) => AccountGenPanelsModalDetailsActions.loadItemsByParameters())
    )
  );

  public loadItemsByParameters$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenPanelsModalDetailsActions.loadItemsByParameters),
      mergeMap((action) => forkJoin([
        [action],
        this.store.select(AccountGenPanelsModalDetailsSelectors.parameters).pipe(take(1))
      ])),
      concatMap(([_, parameters]) => {
        return this.userGroupService
          .search({
            page: parameters.page,
            perPage: parameters.perPage
          })
          .pipe(
            map((response: PaginationResponse<UserGroup>) => AccountGenPanelsModalDetailsActions.loadItemsSuccess({
              response
            })),
            catchError((response: HttpErrorResponse) => [AccountGenPanelsModalDetailsActions.loadItemsFailure({
              response
            })])
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private genPanelService: GenPanelService,
    private modalService: ModalService,
    private userGroupService: UserGroupService
  ) { }
}
