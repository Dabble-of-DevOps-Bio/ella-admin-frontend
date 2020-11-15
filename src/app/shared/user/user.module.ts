import { IsAdminGuard, IsSuperadminGuard, UnauthenticatedGuard, AuthenticatedGuard } from './guards';
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
    IsSuperadminGuard,
    AuthenticatedGuard,
    UnauthenticatedGuard
  ]
})
export class UserModule { }
