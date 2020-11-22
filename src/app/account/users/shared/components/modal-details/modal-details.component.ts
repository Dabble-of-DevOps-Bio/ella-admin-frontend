import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { AccountUsersDetailsForm } from '../../forms';
import { AccountUsersModalDetailsFacade } from './modal-details.facade';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseModalComponent } from '@shared/base-modal';
import { CustomSelectOption } from '@shared/custom-select';
import { AuthGroupEnum } from '@shared/user/enums';
import { UserGroup } from '@shared/user-group';

@Component({
  selector: 'users-modal-details',
  templateUrl: 'modal-details.html',
  styleUrls: ['modal-details.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountUsersModalDetailsComponent extends BaseModalComponent implements OnInit, OnDestroy {
  public isSubmitting$: Observable<boolean>;
  public formState$: Observable<FormGroupState<AccountUsersDetailsForm>>;
  public isNewUser: boolean;
  public authGroupOptions: Array<CustomSelectOption<number, AuthGroupEnum>>;
  public groupItems$: Observable<Array<UserGroup>>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    protected dialogRef: MatDialogRef<AccountUsersModalDetailsComponent>,
    protected facade: AccountUsersModalDetailsFacade
  ) {
    super(dialogRef, facade);

    this.isSubmitting$ = this.facade.isSubmitting$;
    this.formState$ = this.facade.formState$;
    this.isNewUser = (this.data.id === null);
    this.authGroupOptions = this.facade.authGroupOptions;
    this.groupItems$ = this.facade.groupItems$;
  }

  public ngOnInit(): void {
    this.facade.initModal(this.data.id);
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public save(): void {
    this.facade.save(this.modalID);
  }
}
