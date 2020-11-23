import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { AccountUsersPasswordForm } from '../../forms';
import { AccountUsersModalPasswordFacade } from './modal-password.facade';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseModalComponent } from '@shared/base-modal';

@Component({
  selector: 'users-modal-password',
  templateUrl: 'modal-password.html',
  styleUrls: ['modal-password.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountUsersModalPasswordComponent extends BaseModalComponent implements OnInit, OnDestroy {
  public isSubmitting$: Observable<boolean>;
  public formState$: Observable<FormGroupState<AccountUsersPasswordForm>>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    protected dialogRef: MatDialogRef<AccountUsersModalPasswordComponent>,
    protected facade: AccountUsersModalPasswordFacade
  ) {
    super(dialogRef, facade);

    this.isSubmitting$ = this.facade.isSubmitting$;
    this.formState$ = this.facade.formState$;
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
