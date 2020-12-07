import { PublicResetPasswordPageComponent } from './reset-password.component';
import { PublicResetPasswordPageEffects, publicResetPasswordPageReducer } from './shared/store';
import { AppState } from '@shared/store/state';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';
import { configuration } from '@configurations';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('PublicResetPasswordPageComponent', () => {
  let component: RenderResult<PublicResetPasswordPageComponent>;
  let componentInstance: PublicResetPasswordPageComponent;
  let store: Store<AppState>;

  const translation = require(`../../../assets/i18n/${configuration.language.default}.json`);

  beforeEach(async () => {
    component = await render(PublicResetPasswordPageComponent, {
      imports: [
        TranslateTestingModule.withTranslations(configuration.language.default, translation),
        StoreModule.forRoot({}, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        }),
        StoreModule.forFeature('publicResetPasswordPage', publicResetPasswordPageReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([PublicResetPasswordPageEffects])
      ],
      declarations: [
        PublicResetPasswordPageComponent
      ],
      routes: [],
      providers: []
    });

    componentInstance = component.fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

