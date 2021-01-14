import { AccountCustomReportsPageComponent } from './custom-reports.component';
import { AccountCustomReportsPageEffects, accountCustomReportsPageReducer } from './shared/store';
import { AppState } from '@shared/store/state';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';
import { configuration } from '@configurations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { AccountCustomReportsPageFacade } from './custom-reports.facade';

describe('AccountCustomReportsPageComponent', () => {
  let component: RenderResult<AccountCustomReportsPageComponent>;
  let componentInstance: AccountCustomReportsPageComponent;
  let store: Store<AppState>;

  const translation = require(`../../../assets/i18n/${configuration.language.default}.json`);

  beforeEach(async () => {
    component = await render(AccountCustomReportsPageComponent, {
      imports: [
        TranslateTestingModule.withTranslations(configuration.language.default, translation),
        StoreModule.forRoot({}, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        }),
        StoreModule.forFeature('accountCustomReportsPage', accountCustomReportsPageReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AccountCustomReportsPageEffects])
      ],
      declarations: [
        AccountCustomReportsPageComponent
      ],
      routes: [],
      providers: [AccountCustomReportsPageFacade]
    });

    componentInstance = component.fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

