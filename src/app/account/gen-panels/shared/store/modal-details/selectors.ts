import { AppState } from '@shared/store';
import { AccountGenPanelsDetailsForm } from '../../forms';
import { AccountGenPanelsModalDetailsState } from './state';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { UserGroup } from '@shared/user-group';
import { CustomMultiselectOption } from '@shared/custom-multiselect';
import { PaginationRequest } from '@shared/pagination';

const selectFeature = (state: AppState) => state.accountGenPanelsPage.modalDetails;

export class AccountGenPanelsModalDetailsSelectors {
  public static isSubmitting: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountGenPanelsModalDetailsState) => state.isSubmitting
  );

  public static formState: MemoizedSelector<AppState, FormGroupState<AccountGenPanelsDetailsForm>> = createSelector(
    selectFeature,
    (state: AccountGenPanelsModalDetailsState) => state.formState
  );

  public static items: MemoizedSelector<AppState, Array<UserGroup>> = createSelector(
    selectFeature,
    (state: AccountGenPanelsModalDetailsState) => (state.items) ? state.items : []
  );

  public static options: MemoizedSelector<AppState, Array<CustomMultiselectOption<number, UserGroup>>> = createSelector(
    AccountGenPanelsModalDetailsSelectors.items,
    (items) => items.map((item) => new CustomMultiselectOption({
      id: item.id,
      title: item.name,
      tagTitle: item.name
    }))
  );

  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountGenPanelsModalDetailsState) => state.isLoading || false
  );

  public static parameters: MemoizedSelector<AppState, Partial<PaginationRequest>> = createSelector(
    selectFeature,
    (state: AccountGenPanelsModalDetailsState) => <Partial<PaginationRequest>>{
        page: state.page,
        perPage: state.perPage,
        query: state.query
      }
  );

  public static totalItems: MemoizedSelector<AppState, number> = createSelector(
    selectFeature,
    (state: AccountGenPanelsModalDetailsState) => state.totalItems
  );

  public static hasMoreItems: MemoizedSelector<AppState, boolean> = createSelector(
    AccountGenPanelsModalDetailsSelectors.items,
    AccountGenPanelsModalDetailsSelectors.totalItems,
    (items, totalItems) => totalItems > items.length
  );
}
