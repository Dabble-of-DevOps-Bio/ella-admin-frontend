import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<AccountModalConfirmationComponent>
  ) { }

  public onConfirm(): void {
    this.data.action({
      id: this.data.id,
      modalID: this.dialogRef.id
    });
  }
}
