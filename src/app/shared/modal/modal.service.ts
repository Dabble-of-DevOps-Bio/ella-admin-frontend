import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { ModalData } from '@shared/modal/models';

@Injectable()
export class ModalService {
  constructor(
    private matDialog: MatDialog
  ) { }

  public open<Component, Data = any>(
    component: ComponentType<Component>,
    config: MatDialogConfig<Data> = {}
  ): MatDialogRef<Component> {
    return this.matDialog.open(component, config);
  }

  public openModal<Component>(component: ComponentType<Component>, data?: ModalData, panelClass?: string): MatDialogRef<Component> {
    return this.open(component, {
      panelClass: ['modalbox', (panelClass || '')],
      data
    });
  }

  public changeDisableClose(id: string, isDisableClose: boolean): void {
    const openedDialog = this.matDialog.getDialogById(id);

    if (openedDialog) {
      openedDialog.disableClose = isDisableClose;
    }
  }

  public closeByID(id: string): void {
    const dialog = this.matDialog.getDialogById(id);

    if (dialog && !dialog.disableClose) {
      dialog.close();
    }
  }

  public getByID<Component>(id: string): MatDialogRef<Component> {
    return this.matDialog.getDialogById(id);
  }

  public closeAll(): void {
    this.matDialog.closeAll();
  }
}
