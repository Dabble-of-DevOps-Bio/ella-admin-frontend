import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { WebpackTranslateLoader } from './app.translate.loader';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ApiModule } from '@ronas-it/angular-common';
import { configuration } from '@configurations';
import { NavbarModule } from '@shared/navbar';
import { UserEffects, UserModule, userReducer } from '@shared/user';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { NotificationComponent, NotificationEffects, NotificationModule } from '@shared/notification';
import { AuthEffects, AuthModule, authReducer, jwtOptionsFactory } from '@shared/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalEffects, ModalModule } from '@shared/modal';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ApiModule.forRoot({
      apiUrl: configuration.api.url
    }),
    AuthModule,
    UserModule,
    ModalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader
      }
    }),
    EffectsModule.forRoot([
      AuthEffects,
      UserEffects,
      NotificationEffects,
      ModalEffects
    ]),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot({
      router: routerReducer,
      authState: authReducer,
      userState: userReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 30,
      logOnly: false
    }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Store]
      }
    }),
    NavbarModule,
    NotificationModule,
    ToastrModule.forRoot({
      ...configuration.notifications,
      toastComponent: NotificationComponent
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
