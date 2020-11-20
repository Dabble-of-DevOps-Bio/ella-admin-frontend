import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ValidationErrorsComponent } from './validation-errors.component';

@NgModule({
  declarations: [
    ValidationErrorsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ValidationErrorsComponent
  ]
})
export class ValidationErrorsModule { }
