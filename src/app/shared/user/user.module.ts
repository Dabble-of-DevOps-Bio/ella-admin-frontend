import { NgModule } from '@angular/core';
import { UserService } from './user.service';
import { ApiModule } from '@ronas-it/angular-common';
import { configuration } from '@configurations';
import { IsAdminGuard, IsStaffGuard } from './guards';

@NgModule({
  imports: [
    ApiModule.forRoot({
      apiUrl: configuration.api.url
    })
  ],
  providers: [
    UserService,
    IsStaffGuard,
    IsAdminGuard
  ]
})
export class UserModule { }
