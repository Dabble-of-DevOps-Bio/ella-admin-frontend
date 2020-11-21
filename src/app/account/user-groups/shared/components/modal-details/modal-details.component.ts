import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { AccountUserGroupsDetailsForm } from '../../forms';
import { AccountUserGroupsModalDetailsFacade } from './modal-details.facade';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseModalComponent } from '@shared/base-modal';

@Component({
  selector: 'user-groups-modal-details',
  templateUrl: 'modal-details.html',
  styleUrls: ['modal-details.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountUserGroupsModalDetailsComponent extends BaseModalComponent implements OnInit, OnDestroy {
  public isSubmitting$: Observable<boolean>;
  public formState$: Observable<FormGroupState<AccountUserGroupsDetailsForm>>;
  public isNewGroup: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    protected dialogRef: MatDialogRef<AccountUserGroupsModalDetailsComponent>,
    protected facade: AccountUserGroupsModalDetailsFacade
  ) {
    super(dialogRef, facade);

    this.isSubmitting$ = this.facade.isSubmitting$;
    this.formState$ = this.facade.formState$;
    this.isNewGroup = (this.data.id === null);
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
