import { AdminDashboardPageComponent } from '@app/admin/dashboard/dashboard.component';
import { AdminSessionsPageComponent } from '@app/admin/sessions/sessions.component';
import { ApiService } from '@shared/api';
import { AppState } from '@shared/store';
import {
  AuthActions,
  AuthEffects,
  AuthenticatedGuard,
  AuthModule,
  authReducer,
  AuthSelectors,
  JwtExceptions,
  UnauthenticatedGuard
} from '@shared/auth';
import { authCredentials, authResponse, responseData, profileData } from '@tests/fixtures';
import { catchError, take } from 'rxjs/operators';
import { configuration } from '@configurations';
import { EffectsModule } from '@ngrx/effects';
import { EmptyComponent } from '@tests/helpers';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IsAdminGuard, UserEffects, UserModule, userReducer, UserRoleEnum } from '@shared/user';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { jwtOptionsFactory } from './factories';
import { Location } from '@angular/common';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { PublicLoginPageComponent } from '@app/public/login/login.component';
import { PublicNotFoundPageComponent } from '@app/public/not-found/not-found.component';
import { render, RenderResult } from '@testing-library/angular';
import { routerReducer } from '@ngrx/router-store';
import { RouterTestingModule } from '@angular/router/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Type } from '@angular/core';

describe('AuthModule', () => {
  const requestProfileURL = encodeURI(`${configuration.api.url}${'/profile?with[]=photo'}`);
  let component: RenderResult<EmptyComponent>;
  let AdminDashboardPageMockComponent: Type<AdminDashboardPageComponent>;
  let AdminSessionsPageMockComponent: Type<AdminSessionsPageComponent>;
  let PublicLoginPageMockComponent: Type<PublicLoginPageComponent>;
  let PublicNotFoundPageMockComponent: Type<PublicNotFoundPageComponent>;
  let store: Store<AppState>;

  describe('with authenticated and unauthenticated guards', () => {
    AdminDashboardPageMockComponent = MockComponent(AdminDashboardPageComponent);
    AdminSessionsPageMockComponent = MockComponent(AdminSessionsPageComponent);
    PublicLoginPageMockComponent = MockComponent(PublicLoginPageComponent);
    PublicNotFoundPageMockComponent = MockComponent(PublicNotFoundPageComponent);

    beforeEach(async () => {
      component = await render(EmptyComponent, {
        imports: [
          StoreModule.forRoot({
            router: routerReducer,
            authState: authReducer,
            userState: userReducer
          }, {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true
            }
          }),
          RouterTestingModule.withRoutes([
            { path: 'dashboard', component: AdminDashboardPageMockComponent, canActivate: [AuthenticatedGuard, IsAdminGuard] },
            { path: 'sessions', component: AdminSessionsPageMockComponent, canActivate: [AuthenticatedGuard, IsAdminGuard] },
            { path: 'login', component: PublicLoginPageMockComponent, canActivate: [UnauthenticatedGuard] },
            { path: 'not-found', component: PublicNotFoundPageMockComponent }
          ]),
          EffectsModule.forRoot([
            AuthEffects,
            UserEffects
          ]),
          AuthModule,
          UserModule
        ],
        declarations: [
          EmptyComponent,
          AdminDashboardPageMockComponent,
          AdminSessionsPageMockComponent,
          PublicLoginPageMockComponent,
          PublicNotFoundPageMockComponent
        ],
        providers: [
          {
            provide: ApiService,
            useValue: {
              get: jest.fn().mockImplementation((endpoint) => {
                if (endpoint === '/profile') {
                  return of(profileData);
                }
              }),
              post: jest.fn().mockReturnValue(of(authResponse)),
              put: jest.fn().mockReturnValue(of({})),
              delete: jest.fn().mockReturnValue(of({}))
            }
          }
        ]
      });

      store = TestBed.inject(Store);
    });

    it('should redirect to login page when user is not authenticated', inject([Location], async (location: Location) => {
      await component.fixture.ngZone.run(async () => {
        await component.navigate('dashboard');

        expect(location.path()).toBe('/login');
      });
    }));

    it('should not redirect to login page when user is authenticated', inject([Location], async (location: Location) => {
      await component.fixture.ngZone.run(async () => {
        store.dispatch(AuthActions.authorize({ credentials: authCredentials }));

        await component.navigate('sessions');

        expect(location.path()).toBe('/sessions');
      });
    }));

    it('should redirect to root route from login page when user is authenticated', inject([Location], async (location: Location) => {
      await component.fixture.ngZone.run(async () => {
        store.dispatch(AuthActions.authorize({ credentials: authCredentials }));

        await component.navigate('login');

        expect(location.path()).toBe('/');
      });
    }));

    it('should not redirect to root route from login page when user is not authenticated', inject([Location], async (location: Location) => {
      await component.fixture.ngZone.run(async () => {
        await component.navigate('login');

        expect(location.path()).toBe('/login');
      });
    }));

    it('should redirect to not found page when user is authenticated but not admin', inject([Location], async (location: Location) => {
      const apiService = TestBed.inject(ApiService);
      jest.spyOn(apiService, 'get').mockReturnValue(of({
        ...profileData,
        role_id: UserRoleEnum.SUBSCRIBER
      }));

      await component.fixture.ngZone.run(async () => {
        store.dispatch(AuthActions.authorize({ credentials: authCredentials }));

        await component.navigate('sessions');

        expect(location.path()).toBe('/not-found');
      });
    }));
  });

  describe('with token expired interceptor', () => {
    let apiService: ApiService;
    let backend: HttpTestingController;

    beforeEach( async () => {
      component = await render(EmptyComponent, {
        imports: [
          StoreModule.forRoot({
            router: routerReducer,
            authState: authReducer,
            userState: userReducer
          }, {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true
            }
          }),
          RouterTestingModule.withRoutes([
            { path: 'dashboard', component: AdminDashboardPageMockComponent, canActivate: [AuthenticatedGuard, IsAdminGuard] },
            { path: 'login', component: PublicLoginPageMockComponent, canActivate: [UnauthenticatedGuard] }
          ]),
          EffectsModule.forRoot([]),
          EffectsModule.forFeature([AuthEffects, UserEffects]),
          AuthModule,
          UserModule,
          HttpClientTestingModule,
          JwtModule.forRoot({
            jwtOptionsProvider: {
              provide: JWT_OPTIONS,
              useFactory: jwtOptionsFactory,
              deps: [Store]
            }
          })
        ],
        declarations: [
          EmptyComponent,
          AdminDashboardPageMockComponent,
          PublicLoginPageMockComponent
        ],
        providers: [
          ApiService
        ]
      });

      store = TestBed.inject(Store);
      apiService = TestBed.inject(ApiService);
      backend = TestBed.inject(HttpTestingController);
    });

    afterEach(inject([HttpTestingController], (_backend: HttpTestingController) => {
      _backend.verify();
    }));

    it('should refresh token when it expired', fakeAsync(() => {
      jest.spyOn(apiService, 'post').mockReturnValue(of(authResponse));
      store.dispatch(AuthActions.authorize({ credentials: authCredentials }));

      const jwtHelperService: JwtHelperService = TestBed.inject(JwtHelperService);
      jest.spyOn(jwtHelperService, 'isTokenExpired').mockReturnValue(true);

      const expectedToken = 'expectedToken';

      apiService
        .get('/endpoint')
        .subscribe({
          next: () => {
            store
              .pipe(
                select(AuthSelectors.token),
                take(1)
              )
              .subscribe((token) => {
                expect(token).toBe(expectedToken);
              });
          },
        });

      tick();

      backend
        .expectOne({
          method: 'GET',
          url: `${configuration.api.url}${'/auth/refresh'}`
        })
        .flush(
          new HttpResponse({
            body: responseData,
            status: 200
          }),
          {
            headers: new HttpHeaders({ 'Authorization': `Bearer ${expectedToken}` })
          }
        );

      tick();

      backend
        .expectOne({
          method: 'GET',
          url: `${configuration.api.url}${'/endpoint'}`
        })
        .flush(new HttpResponse({
          body: responseData,
          status: 200
        }));

      tick();

      backend
        .expectOne({
          method: 'GET',
          url: requestProfileURL
        })
        .flush(new HttpResponse({
          body: responseData,
          status: 200
        }));

      tick();
    }));

    it('should unauthorize when token cannot be refreshed', fakeAsync(inject([Location], async (location: Location) => {
      jest.spyOn(apiService, 'post').mockReturnValue(of(authResponse));
      store.dispatch(AuthActions.authorize({ credentials: authCredentials }));

      const jwtHelperService: JwtHelperService = TestBed.inject(JwtHelperService);
      jest.spyOn(jwtHelperService, 'isTokenExpired').mockReturnValue(true);

      component.fixture.ngZone.run(() => {
        apiService
          .get('/endpoint')
          .subscribe();

        tick();

        backend
          .expectOne({
            method: 'GET',
            url: `${configuration.api.url}${'/auth/refresh'}`
          })
          .flush(
            {
              error: {
                error: JwtExceptions.TOKEN_CANNOT_REFRESH
              }
            },
            {
              status: 401,
              statusText: JwtExceptions.TOKEN_CANNOT_REFRESH
            }
          );

        backend
          .expectNone({
            method: 'GET',
            url: `${configuration.api.url}${'/endpoint'}`
          });

        tick();

        store
          .pipe(
            select(AuthSelectors.token),
            take(1)
          )
          .subscribe((token) => {
            expect(token).toBeFalsy();
            expect(location.path()).toBe('/login');
          });

        tick();
      });
    })));

    it('should not intercept for not whitelisted domains', fakeAsync (() => {
      jest.spyOn(apiService, 'post').mockReturnValue(of(authResponse));
      store.dispatch(AuthActions.authorize({ credentials: authCredentials }));

      tick();

      backend
        .expectOne({
          method: 'GET',
          url: `${configuration.api.url}${'/auth/refresh'}`
        })
        .flush(
          new HttpResponse({
            body: responseData,
            status: 200
          }),
          {
            headers: new HttpHeaders({ 'Authorization': `Bearer ${authResponse.token}` })
          }
        );

      const jwtHelperService: JwtHelperService = TestBed.inject(JwtHelperService);
      jest.spyOn(jwtHelperService, 'isTokenExpired').mockReturnValue(true);

      const domain = 'https://not.whitelisted.domain';
      const httpClient: HttpClient = TestBed.inject(HttpClient);

      httpClient
        .get(domain)
        .subscribe(() => {
          store
            .pipe(
              select(AuthSelectors.token),
              take(1)
            )
            .subscribe((token) => {
              expect(token).toBe(authResponse.token);
            });
        });

      tick();

      backend
        .expectOne(domain)
        .flush(new HttpResponse({
          body: responseData,
          status: 200
        }));

      tick();
    }));

    it('should refresh token when server returns token expired error', fakeAsync (() => {
      jest.spyOn(apiService, 'post').mockReturnValue(of(authResponse));
      store.dispatch(AuthActions.authorize({ credentials: authCredentials }));

      const jwtHelperService: JwtHelperService = TestBed.inject(JwtHelperService);
      jest.spyOn(jwtHelperService, 'isTokenExpired').mockReturnValue(false);

      const expectedToken = 'expectedToken';

      apiService
        .get('/endpoint')
        .subscribe({
          next: () => {
            store
              .pipe(
                select(AuthSelectors.token),
                take(1)
              )
              .subscribe((token) => {
                expect(token).toBe(expectedToken);
              });
          },
        });

      tick();

      backend
        .expectOne({
          method: 'GET',
          url: `${configuration.api.url}${'/endpoint'}`
        })
        .flush(
          {
            error: JwtExceptions.TOKEN_EXPIRED
          },
          {
            status: 401,
            statusText: JwtExceptions.TOKEN_EXPIRED
          }
        );

      tick();

      backend
        .expectOne({
          method: 'GET',
          url: `${configuration.api.url}${'/auth/refresh'}`
        })
        .flush(
          new HttpResponse({
            body: responseData,
            status: 200
          }),
          {
            headers: new HttpHeaders({ 'Authorization': `Bearer ${expectedToken}` })
          }
        );

      tick();

      backend
        .expectOne({
          method: 'GET',
          url: `${configuration.api.url}${'/endpoint'}`
        })
        .flush(new HttpResponse({
          body: responseData,
          status: 200
        }));

      tick();

      backend
        .expectOne({
          method: 'GET',
          url: requestProfileURL
        })
        .flush(new HttpResponse({
          body: responseData,
          status: 200
        }));

      tick();
    }));

    it('should not refresh token when server returns error other than 401', fakeAsync (async () => {
      jest.spyOn(apiService, 'post').mockReturnValue(of(authResponse));
      store.dispatch(AuthActions.authorize({ credentials: authCredentials }));

      tick();

      backend
        .expectOne({
          method: 'GET',
          url: `${configuration.api.url}${'/auth/refresh'}`
        })
        .flush(
          new HttpResponse({
            body: responseData,
            status: 200
          }),
          {
            headers: new HttpHeaders({ 'Authorization': `Bearer ${authResponse.token}` })
          }
        );

      const jwtHelperService: JwtHelperService = TestBed.inject(JwtHelperService);
      jest.spyOn(jwtHelperService, 'isTokenExpired').mockReturnValue(false);

      apiService
        .get('/endpoint')
        .pipe(
          catchError(() => {
            return of(
              store
                .pipe(
                  select(AuthSelectors.token),
                  take(1)
                )
                .subscribe((token) => {
                  expect(token).toBe(authResponse.token);
                })
            );
          })
        )
        .subscribe();

      tick();

      backend
        .expectOne({
          method: 'GET',
          url: `${configuration.api.url}${'/endpoint'}`
        })
        .flush(
          null,
          {
            status: 500,
            statusText: 'Server error'
          }
        );

      tick();
    }));

    it('should refresh token only once when intercepts two or more requests', fakeAsync (async () => {
      jest.spyOn(apiService, 'post').mockReturnValue(of(authResponse));
      store.dispatch(AuthActions.authorize({ credentials: authCredentials }));

      const jwtHelperService: JwtHelperService = TestBed.inject(JwtHelperService);
      jest.spyOn(jwtHelperService, 'isTokenExpired').mockReturnValue(true);

      const expectedToken = 'expectedToken';

      apiService
        .get('/endpoint/1')
        .subscribe({
          next: () => {
            store
              .pipe(
                select(AuthSelectors.token),
                take(1)
              )
              .subscribe((token) => {
                expect(token).toBe(expectedToken);
              });
          },
        });

      apiService
        .get('/endpoint/2')
        .subscribe({
          next: () => {
            store
              .pipe(
                select(AuthSelectors.token),
                take(1)
              )
              .subscribe((token) => {
                expect(token).toBe(expectedToken);
              });
          },
        });

      tick();

      backend
        .expectOne({
          method: 'GET',
          url: `${configuration.api.url}${'/auth/refresh'}`
        })
        .flush(
          new HttpResponse({
            body: responseData,
            status: 200
          }),
          {
            headers: new HttpHeaders({ 'Authorization': `Bearer ${expectedToken}` })
          }
        );

      tick();

      backend
        .expectOne({
          method: 'GET',
          url: `${configuration.api.url}/endpoint/1`
        })
        .flush(new HttpResponse({
          body: responseData,
          status: 200
        }));

      backend
        .expectOne({
          method: 'GET',
          url: `${configuration.api.url}/endpoint/2`
        })
        .flush(new HttpResponse({
          body: responseData,
          status: 200
        }));

      tick();

      backend
        .expectOne({
          method: 'GET',
          url: requestProfileURL
        })
        .flush(new HttpResponse({
          body: responseData,
          status: 200
        }));

      tick();
    }));
  });
});
