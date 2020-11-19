import { BaseModalFacade } from './base-modal.facade';
import { MatDialogRef } from '@angular/material/dialog';

export class BaseModalComponent<F extends BaseModalFacade = BaseModalFacade> {
  public get modalID(): string {
    return this.dialogRef.id;
  }

  constructor(
    protected dialogRef: MatDialogRef<any>,
    protected facade: F
  ) { }

  public close(): void {
    this.facade.close(this.modalID);
  }
}
