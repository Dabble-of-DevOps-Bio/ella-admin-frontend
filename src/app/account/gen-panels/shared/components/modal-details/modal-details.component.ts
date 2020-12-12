import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { AccountGenPanelsDetailsForm } from '../../forms';
import { AccountGenPanelsModalDetailsFacade } from './modal-details.facade';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseModalComponent } from '@shared/base-modal';
import { CustomMultiselectOption } from '@shared/custom-multiselect';
import { UserGroup } from '@shared/user-group';

@Component({
  selector: 'gen-panels-modal-details',
  templateUrl: 'modal-details.html',
  styleUrls: ['modal-details.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountGenPanelsModalDetailsComponent extends BaseModalComponent implements OnInit, OnDestroy {
  public isSubmitting$: Observable<boolean>;
  public formState$: Observable<FormGroupState<AccountGenPanelsDetailsForm>>;
  public options$: Observable<Array<CustomMultiselectOption<number, UserGroup>>>;
  public isLoading$: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    protected dialogRef: MatDialogRef<AccountGenPanelsModalDetailsComponent>,
    protected facade: AccountGenPanelsModalDetailsFacade
  ) {
    super(dialogRef, facade);

    this.isSubmitting$ = this.facade.isSubmitting$;
    this.formState$ = this.facade.formState$;
    this.options$ = this.facade.options$;
    this.isLoading$ = this.facade.isLoading$;

    this.facade.loadItems();
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

  public onLoadNextPage(): void {
    this.facade.loadNextPage();
  }
}
