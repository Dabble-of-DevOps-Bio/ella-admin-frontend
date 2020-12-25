import { AccountAnalysesReportPageComponent } from './report.component';
import { AccountAnalysesReportPageEffects, accountAnalysesReportPageReducer } from './shared/store/root';
import { AppState } from '@shared/store/state';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';
import { configuration } from '@configurations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { AccountAnalysesReportPageFacade } from './report.facade';

describe('AccountAnalysesReportPageComponent', () => {
  let component: RenderResult<AccountAnalysesReportPageComponent>;
  let componentInstance: AccountAnalysesReportPageComponent;
  let store: Store<AppState>;

  const translation = require(`../../../../assets/i18n/${configuration.language.default}.json`);

  beforeEach(async () => {
    component = await render(AccountAnalysesReportPageComponent, {
      imports: [
        TranslateTestingModule.withTranslations(configuration.language.default, translation),
        StoreModule.forRoot({}, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        }),
        StoreModule.forFeature('accountAnalysesReportPage', accountAnalysesReportPageReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AccountAnalysesReportPageEffects])
      ],
      declarations: [
        AccountAnalysesReportPageComponent
      ],
      routes: [],
      providers: [AccountAnalysesReportPageFacade]
    });

    componentInstance = component.fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

