import { AccountProfilePageComponent } from './profile.component';
import { AccountProfilePageEffects, accountProfilePageReducer } from './shared/store';
import { AppState } from '@shared/store/state';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';
import { configuration } from '@configurations';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('AccountProfilePageComponent', () => {
  let component: RenderResult<AccountProfilePageComponent>;
  let componentInstance: AccountProfilePageComponent;
  let store: Store<AppState>;

  const translation = require(`../../../assets/i18n/${configuration.language.default}.json`);

  beforeEach(async () => {
    component = await render(AccountProfilePageComponent, {
      imports: [
        TranslateTestingModule.withTranslations(configuration.language.default, translation),
        StoreModule.forRoot({}, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        }),
        StoreModule.forFeature('accountProfilePage', accountProfilePageReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AccountProfilePageEffects])
      ],
      declarations: [
        AccountProfilePageComponent
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

