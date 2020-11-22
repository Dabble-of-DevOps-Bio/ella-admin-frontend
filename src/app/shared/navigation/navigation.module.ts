import { CommonModule } from '@angular/common';
import { NavigationService } from './navigation.service';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    NavigationService
  ]
})
export class NavigationModule { }
