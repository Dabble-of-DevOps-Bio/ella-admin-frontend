import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { BaseModalFacade } from '@shared/base-modal';
import { AccountGenePanelsDetailsForm } from '../../forms';
import { AccountGenePanelsModalDetailsActions, AccountGenePanelsModalDetailsSelectors } from '../../store';
import { UserGroup } from '@shared/user-group';
import { CustomMultiselectOption } from '@shared/custom-multiselect';

@Injectable()
export class AccountGenePanelsModalDetailsFacade extends BaseModalFacade {
  public get formState$(): Observable<FormGroupState<AccountGenePanelsDetailsForm>> {
    return this.store.select(AccountGenePanelsModalDetailsSelectors.formState);
  }

  public get isSubmitting$(): Observable<boolean> {
    return this.store.select(AccountGenePanelsModalDetailsSelectors.isSubmitting);
  }

  public get isLoading$(): Observable<boolean> {
    return this.store.select(AccountGenePanelsModalDetailsSelectors.isLoading);
  }

  public get items$(): Observable<Array<UserGroup>> {
    return this.store.select(AccountGenePanelsModalDetailsSelectors.items);
  }

  public get options$(): Observable<Array<CustomMultiselectOption<number, UserGroup>>> {
    return this.store.select(AccountGenePanelsModalDetailsSelectors.options);
  }

  constructor(
    protected store: Store<AppState>
  ) {
    super(store);
  }

  public resetState(): void {
    this.store.dispatch(AccountGenePanelsModalDetailsActions.resetState());
  }

  public initModal(id: number): void {
    this.store.dispatch(AccountGenePanelsModalDetailsActions.initModal({ id }));
  }

  public save(modalID: string): void {
    this.store.dispatch(AccountGenePanelsModalDetailsActions.save({ modalID }));
  }

  public loadItems(): void {
    this.store.dispatch(AccountGenePanelsModalDetailsActions.loadItems());
  }

  public loadNextPage(): void {
    this.store.dispatch(AccountGenePanelsModalDetailsActions.loadNextPage());
  }
}
