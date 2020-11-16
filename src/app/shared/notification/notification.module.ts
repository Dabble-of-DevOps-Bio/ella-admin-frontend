import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule
  ],
  declarations: [
    NotificationComponent
  ],
  exports: [
    NotificationComponent
  ],
  providers: [
    NotificationService
  ]
})
export class NotificationModule { }
