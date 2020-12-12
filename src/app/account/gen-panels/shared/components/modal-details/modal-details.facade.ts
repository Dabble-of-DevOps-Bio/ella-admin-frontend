import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { BaseModalFacade } from '@shared/base-modal';
import { AccountGenPanelsDetailsForm } from '../../forms';
import { AccountGenPanelsModalDetailsActions, AccountGenPanelsModalDetailsSelectors } from '../../store';
import { UserGroup } from '@shared/user-group';
import { CustomMultiselectOption } from '@shared/custom-multiselect';

@Injectable()
export class AccountGenPanelsModalDetailsFacade extends BaseModalFacade {
  public get formState$(): Observable<FormGroupState<AccountGenPanelsDetailsForm>> {
    return this.store.select(AccountGenPanelsModalDetailsSelectors.formState);
  }

  public get isSubmitting$(): Observable<boolean> {
    return this.store.select(AccountGenPanelsModalDetailsSelectors.isSubmitting);
  }

  public get isLoading$(): Observable<boolean> {
    return this.store.select(AccountGenPanelsModalDetailsSelectors.isLoading);
  }

  public get items$(): Observable<Array<UserGroup>> {
    return this.store.select(AccountGenPanelsModalDetailsSelectors.items);
  }

  public get options$(): Observable<Array<CustomMultiselectOption<number, UserGroup>>> {
    return this.store.select(AccountGenPanelsModalDetailsSelectors.options);
  }

  constructor(
    protected store: Store<AppState>
  ) {
    super(store);
  }

  public resetState(): void {
    this.store.dispatch(AccountGenPanelsModalDetailsActions.resetState());
  }

  public initModal(id: number): void {
    this.store.dispatch(AccountGenPanelsModalDetailsActions.initModal({ id }));
  }

  public save(modalID: string): void {
    this.store.dispatch(AccountGenPanelsModalDetailsActions.save({ modalID }));
  }

  public loadItems(): void {
    this.store.dispatch(AccountGenPanelsModalDetailsActions.loadItems());
  }

  public loadNextPage(): void {
    this.store.dispatch(AccountGenPanelsModalDetailsActions.loadNextPage());
  }
}
