import { CommonModule } from '@angular/common';
import { FormTextComponent } from './form-text.component';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';

@NgModule({
  declarations: [
    FormTextComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule,
    // ValidationErrorsModule
  ],
  exports: [
    FormTextComponent
  ]
})
export class FormTextModule { }
