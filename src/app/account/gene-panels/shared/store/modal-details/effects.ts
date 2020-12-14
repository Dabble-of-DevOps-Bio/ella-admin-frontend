import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { AccountGenePanelsModalDetailsActions } from './actions';
import { withLatestFrom, filter, switchMap, map, mergeMap, catchError, tap, concatMap, take } from 'rxjs/operators';
import { AccountGenePanelsModalDetailsSelectors } from './selectors';
import { ModalActions, ModalService } from '@shared/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountGenePanelsPageRootActions, AccountGenePanelsPageRootSelectors } from '../root';
import { AccountGenePanelsModalDetailsComponent } from '../../components/modal-details/modal-details.component';
import { NotificationActions } from '@shared/notification';
import { GenePanel, GenePanelService } from '@shared/gene-panel';
import { UserGroup, UserGroupService } from '@shared/user-group';
import { PaginationResponse } from '@shared/pagination';
import { unbox } from 'ngrx-forms';

@Injectable()
export class AccountGenePanelsModalDetailsEffects {
  public initModal$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenePanelsModalDetailsActions.initModal),
      mergeMap(({ id }) => this.store.select(AccountGenePanelsPageRootSelectors.item, id)),
      map((genPanel) => AccountGenePanelsModalDetailsActions.prefillForm({ genPanel }))
    )
  );

  public save$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenePanelsModalDetailsActions.save),
      withLatestFrom(
        this.store.select(AccountGenePanelsModalDetailsSelectors.formState)
      ),
      filter(([_, formState]) => formState.isValid),
      switchMap(([{ modalID }, formState]) => {
        const updateRequest = new GenePanel({
          id: formState.value.id,
          groups: unbox(formState.value.groups)
        });

        return this.genPanelService
          .update(updateRequest)
          .pipe(
            mergeMap((response) => [
              AccountGenePanelsModalDetailsActions.saveSuccess({ response: updateRequest }),
              ModalActions.changeDisableClose({ modalID, isDisableClose: false }),
              ModalActions.closeAll(),
            ]),
            catchError((response: HttpErrorResponse) => [AccountGenePanelsModalDetailsActions.saveFailure({ response })])
          );
      })
    )
  );

  public saveSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenePanelsModalDetailsActions.saveSuccess),
      mergeMap(() => [
        NotificationActions.showSuccess({
          translationKey: 'SHARED.NOTIFICATIONS.TEXT_SUCCESS'
        }),
        AccountGenePanelsPageRootActions.loadItemsByParameters({}),
      ])
    )
  );

  public saveFailure$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenePanelsModalDetailsActions.saveFailure),
      map((response) => NotificationActions.showError({
        translationKey: (response.response.error.name !== undefined) ? response.response.error.name[0] : 'SHARED.NOTIFICATIONS.TEXT_ERROR'
      }))
    )
  );

  public openDetailsDialog$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenePanelsModalDetailsActions.openDetailsDialog),
      tap(() => {
        this.modalService.open(AccountGenePanelsModalDetailsComponent, {
          panelClass: 'gene-panels-modal-panel',
          data: { id: null }
        });
      })
    ),
    { dispatch: false }
  );

  public loadItems$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenePanelsModalDetailsActions.loadItems),
      map((action) => AccountGenePanelsModalDetailsActions.loadItemsByParameters())
    )
  );

  public loadNextPage$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenePanelsModalDetailsActions.loadNextPage),
      mergeMap((action) => forkJoin([
        [action],
        this.store.select(AccountGenePanelsModalDetailsSelectors.hasMoreItems).pipe(take(1))
      ])),
      filter(([_, hasMoreItems]) => hasMoreItems),
      map(([action]) => AccountGenePanelsModalDetailsActions.loadItemsByParameters())
    )
  );

  public loadItemsByParameters$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenePanelsModalDetailsActions.loadItemsByParameters),
      mergeMap((action) => forkJoin([
        [action],
        this.store.select(AccountGenePanelsModalDetailsSelectors.parameters).pipe(take(1))
      ])),
      concatMap(([_, parameters]) => {
        return this.userGroupService
          .search({
            page: parameters.page,
            perPage: parameters.perPage
          })
          .pipe(
            map((response: PaginationResponse<UserGroup>) => AccountGenePanelsModalDetailsActions.loadItemsSuccess({
              response
            })),
            catchError((response: HttpErrorResponse) => [AccountGenePanelsModalDetailsActions.loadItemsFailure({
              response
            })])
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private genPanelService: GenePanelService,
    private modalService: ModalService,
    private userGroupService: UserGroupService
  ) { }
}
