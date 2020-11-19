import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';
import { ModalData } from '@shared/modal';

@Component({
  selector: 'account-modal-confirmation',
  templateUrl: 'modal-confirmation.html',
  styleUrls: ['modal-confirmation.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountModalConfirmationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    public dialogRef: MatDialogRef<AccountModalConfirmationComponent>,
    private store: Store<AppState>
  ) { }

  public onConfirm(): void {
    this.store.dispatch(this.data.action({
      commentID: this.data.commentID,
      dialogID: this.dialogRef.id
    }));
  }
}
