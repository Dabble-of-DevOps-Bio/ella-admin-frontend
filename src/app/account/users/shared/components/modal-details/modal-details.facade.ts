import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { AccountUsersModalDetailsActions, AccountUsersModalDetailsSelectors } from '../../store';
import { AccountUsersDetailsForm } from '../../forms';
import { TranslateService } from '@ngx-translate/core';
import { BaseModalFacade } from '@shared/base-modal';
import { CustomSelectOption } from '@shared/custom-select';
import { AuthGroupEnum } from '@shared/user/enums';

@Injectable()
export class AccountUsersModalDetailsFacade extends BaseModalFacade {
  public get formState$(): Observable<FormGroupState<AccountUsersDetailsForm>> {
    return this.store.select(AccountUsersModalDetailsSelectors.formState);
  }

  public get isSubmitting$(): Observable<boolean> {
    return this.store.select(AccountUsersModalDetailsSelectors.isSubmitting);
  }

  public get authGroupOptions(): Array<CustomSelectOption<number, AuthGroupEnum>> {
    const translations = this.translateService.instant('SHARED.AUTH_GROUPS');

    return Object.keys(AuthGroupEnum)
      .filter((group) => isNaN(parseInt(group)))
      .map((group) => new CustomSelectOption<AuthGroupEnum>({
        id: Number(AuthGroupEnum[group]),
        title: translations[`TEXT_${group}`]
      }));
  }

  constructor(
    protected store: Store<AppState>,
    private translateService: TranslateService
  ) {
    super(store);
  }

  public resetState(): void {
    this.store.dispatch(AccountUsersModalDetailsActions.resetState());
  }

  public initModal(id: number): void {
    this.store.dispatch(AccountUsersModalDetailsActions.initModal({ id }));
  }

  public save(modalID: string): void {
    this.store.dispatch(AccountUsersModalDetailsActions.save({ modalID }));
  }
}
