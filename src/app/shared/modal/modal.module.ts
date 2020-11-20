import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalService } from './modal.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule
  ],
  providers: [
    ModalService
  ]
})
export class ModalModule { }
