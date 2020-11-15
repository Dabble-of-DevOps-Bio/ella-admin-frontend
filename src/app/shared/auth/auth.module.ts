import { AuthenticatedGuard, UnauthenticatedGuard } from './guards';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JwtInterceptor } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TokenExpiredInterceptor } from './interceptors';

@NgModule({
  imports: [
    RouterModule
  ],
  providers: [
    AuthService,
    AuthenticatedGuard,
    UnauthenticatedGuard,
    JwtInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenExpiredInterceptor,
      deps: [JwtHelperService, JwtInterceptor, Store],
      multi: true
    }
  ]
})
export class AuthModule { }
