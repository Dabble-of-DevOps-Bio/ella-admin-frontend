import { AccountPageComponent } from './gen-panels.component';
import { AccountPageEffects, accountPageReducer } from './shared/store';
import { AppState } from '@shared/store/state';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';
import { configuration } from '@configurations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { AccountPageFacade } from './gen-panels.facade';

describe('AccountPageComponent', () => {
  let component: RenderResult<AccountPageComponent>;
  let componentInstance: AccountPageComponent;
  let store: Store<AppState>;

  const translation = require(`../../../assets/i18n/${configuration.language.default}.json`);

  beforeEach(async () => {
    component = await render(AccountPageComponent, {
      imports: [
        TranslateTestingModule.withTranslations(configuration.language.default, translation),
        StoreModule.forRoot({}, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        }),
        StoreModule.forFeature('accountPage', accountPageReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AccountPageEffects])
      ],
      declarations: [
        AccountPageComponent
      ],
      routes: [],
      providers: [AccountPageFacade]
    });

    componentInstance = component.fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

