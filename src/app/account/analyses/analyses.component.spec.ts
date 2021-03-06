import { AccountAnalysesPageComponent } from './analyses.component';
import { AccountAnalysesPageEffects, accountAnalysesPageReducer } from './shared/store';
import { AppState } from '@shared/store/state';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';
import { configuration } from '@configurations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { AccountAnalysesPageFacade } from './analyses.facade';

describe('AccountAnalysesPageComponent', () => {
  let component: RenderResult<AccountAnalysesPageComponent>;
  let componentInstance: AccountAnalysesPageComponent;
  let store: Store<AppState>;

  const translation = require(`../../../assets/i18n/${configuration.language.default}.json`);

  beforeEach(async () => {
    component = await render(AccountAnalysesPageComponent, {
      imports: [
        TranslateTestingModule.withTranslations(configuration.language.default, translation),
        StoreModule.forRoot({}, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        }),
        StoreModule.forFeature('accountAnalysesPage', accountAnalysesPageReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AccountAnalysesPageEffects])
      ],
      declarations: [
        AccountAnalysesPageComponent
      ],
      routes: [],
      providers: [AccountAnalysesPageFacade]
    });

    componentInstance = component.fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

