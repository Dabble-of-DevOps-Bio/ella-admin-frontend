import { CommonModule } from '@angular/common';
import { CustomMultiselectComponent } from './custom-multiselect.component';
import { CustomMultiselectFacade } from './custom-multiselect.facade';
import { DropdownModule } from '../dropdown/dropdown.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomMultiselectDirective } from './custom-multiselect.directive';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    TranslateModule,
    NgrxFormsModule,
    InfiniteScrollModule
  ],
  declarations: [
    CustomMultiselectComponent,
    CustomMultiselectDirective
  ],
  providers: [
    CustomMultiselectFacade
  ],
  exports: [
    CustomMultiselectComponent
  ]
})
export class CustomMultiselectModule { }
