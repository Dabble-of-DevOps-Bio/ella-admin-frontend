import { IsAdminGuard, IsSuperadminGuard } from './guards';
import { NgModule } from '@angular/core';
import { UserService } from './user.service';
import { ApiModule } from '@ronas-it/angular-common';
import { configuration } from '@configurations';

@NgModule({
  imports: [
    ApiModule.forRoot({
      apiUrl: configuration.api.url
    })
  ],
  providers: [
    UserService,
    IsAdminGuard,
    IsSuperadminGuard
  ]
})
export class UserModule { }
