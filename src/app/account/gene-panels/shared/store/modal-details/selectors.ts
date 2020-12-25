import { AppState } from '@shared/store';
import { AccountGenePanelsDetailsForm } from '../../forms';
import { AccountGenePanelsModalDetailsState } from './state';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { UserGroup } from '@shared/user-group';
import { CustomMultiselectOption } from '@shared/custom-multiselect';
import { PaginationRequest } from '@shared/pagination';

const selectFeature = (state: AppState) => state.accountGenePanelsPage.modalDetails;

export class AccountGenePanelsModalDetailsSelectors {
  public static isSubmitting: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountGenePanelsModalDetailsState) => state.isSubmitting
  );

  public static formState: MemoizedSelector<AppState, FormGroupState<AccountGenePanelsDetailsForm>> = createSelector(
    selectFeature,
    (state: AccountGenePanelsModalDetailsState) => state.formState
  );

  public static items: MemoizedSelector<AppState, Array<UserGroup>> = createSelector(
    selectFeature,
    (state: AccountGenePanelsModalDetailsState) => (state.items) ? state.items : []
  );

  public static options: MemoizedSelector<AppState, Array<CustomMultiselectOption<number, UserGroup>>> = createSelector(
    AccountGenePanelsModalDetailsSelectors.items,
    (items) => items.map((item) => new CustomMultiselectOption({
      id: item.id,
      title: item.name,
      tagTitle: item.name
    }))
  );

  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountGenePanelsModalDetailsState) => state.isLoading || false
  );

  public static parameters: MemoizedSelector<AppState, Partial<PaginationRequest>> = createSelector(
    selectFeature,
    (state: AccountGenePanelsModalDetailsState) => <Partial<PaginationRequest>>{
        page: state.page,
        perPage: state.perPage,
        query: state.query
      }
  );

  public static totalItems: MemoizedSelector<AppState, number> = createSelector(
    selectFeature,
    (state: AccountGenePanelsModalDetailsState) => state.totalItems
  );

  public static hasMoreItems: MemoizedSelector<AppState, boolean> = createSelector(
    AccountGenePanelsModalDetailsSelectors.items,
    AccountGenePanelsModalDetailsSelectors.totalItems,
    (items, totalItems) => totalItems > items.length
  );
}
