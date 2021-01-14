import { AccountCustomReportsReportPageComponent } from './report.component';
import { AccountCustomReportsReportPageEffects, accountCustomReportsReportPageReducer } from './shared/store';
import { AppState } from '@shared/store/state';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';
import { configuration } from '@configurations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { AccountCustomReportsReportPageFacade } from './report.facade';

describe('AccountCustomReportsReportPageComponent', () => {
  let component: RenderResult<AccountCustomReportsReportPageComponent>;
  let componentInstance: AccountCustomReportsReportPageComponent;
  let store: Store<AppState>;

  const translation = require(`../../../../assets/i18n/${configuration.language.default}.json`);

  beforeEach(async () => {
    component = await render(AccountCustomReportsReportPageComponent, {
      imports: [
        TranslateTestingModule.withTranslations(configuration.language.default, translation),
        StoreModule.forRoot({}, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        }),
        StoreModule.forFeature('accountCustomReportsReportPage', accountCustomReportsReportPageReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AccountCustomReportsReportPageEffects])
      ],
      declarations: [
        AccountCustomReportsReportPageComponent
      ],
      routes: [],
      providers: [AccountCustomReportsReportPageFacade]
    });

    componentInstance = component.fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

