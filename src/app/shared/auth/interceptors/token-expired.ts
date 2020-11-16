import { AppState } from '@shared/store';
import { AuthActions, AuthSelectors } from '../store';
import {
  catchError,
  filter,
  switchMap,
  take,
  withLatestFrom
} from 'rxjs/operators';
import { configuration } from '@configurations';
import { EMPTY, Observable, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isNull } from 'lodash';
import { JwtExceptions } from '../enums';
import { JwtHelperService, JwtInterceptor } from '@auth0/angular-jwt';
import { select, Store } from '@ngrx/store';

@Injectable()
export class TokenExpiredInterceptor implements HttpInterceptor {
  constructor(
    private jwtHelperService: JwtHelperService,
    private jwtInterceptor: JwtInterceptor,
    private store: Store<AppState>
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.shouldInterceptRequest(request)) {
      return next.handle(request);
    }

    return this.store.pipe(
      select(AuthSelectors.token),
      take(1),
      switchMap((token) => {
        if (!this.shouldRefreshToken(token) || this.isRefreshTokenRequest(request)) {
          return next.handle(request);
        }

        return this.refreshTokenAndHandleRequest(request, next);
      }),
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401) {
          if (response.error.error === JwtExceptions.TOKEN_EXPIRED) {
            return this.refreshTokenAndHandleRequest(request, next);
          }

          this.store.dispatch(AuthActions.unauthorize());
        }

        return throwError(response);
      })
    );
  }

  private shouldInterceptRequest(request: HttpRequest<any>): boolean {
    return this.jwtInterceptor.isAllowedDomain(request) &&
      !this.jwtInterceptor.isDisallowedRoute(request);
  }

  private isRefreshTokenRequest(request: HttpRequest<any>): boolean {
    return request.url === `${configuration.api.url}/auth/refresh`;
  }

  private shouldRefreshToken(token: string): boolean {
    return token && this.jwtHelperService.isTokenExpired(token);
  }

  private refreshTokenAndHandleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.pipe(
      select(AuthSelectors.isTokenRefreshing),
      withLatestFrom(this.store.select(AuthSelectors.token)),
      take(1),
      switchMap(([isTokenRefreshing, token]) => {
        if (!isTokenRefreshing) {
          this.store.dispatch(AuthActions.refreshToken());
        }

        return this.store.pipe(
          select(AuthSelectors.token),
          filter((newToken) => newToken !== token),
          take(1),
          switchMap((token) => {
            if (isNull(token)) {
              return EMPTY;
            }

            this.store.dispatch(AuthActions.updateToken({ token }));

            return this.jwtInterceptor.intercept(request, next);
          })
        );
      })
    );
  }
}
