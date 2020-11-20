import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalData } from './models';

@Component({
  selector: 'modal',
  templateUrl: 'modal.html',
  styleUrls: ['modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ModalData
  ) { }
}
