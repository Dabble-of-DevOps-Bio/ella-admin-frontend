import { AccountGenePanelsPageComponent } from './gene-panels.component';
import { accountGenePanelsPageReducer, AccountGenePanelsModalDetailsEffects, AccountGenePanelsPageRootEffects } from './shared/store';
import { AppState } from '@shared/store/state';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';
import { configuration } from '@configurations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { AccountGenePanelsPageFacade } from './gene-panels.facade';

describe('AccountGenePanelsPageComponent', () => {
  let component: RenderResult<AccountGenePanelsPageComponent>;
  let componentInstance: AccountGenePanelsPageComponent;
  let store: Store<AppState>;

  const translation = require(`../../../assets/i18n/${configuration.language.default}.json`);

  beforeEach(async () => {
    component = await render(AccountGenePanelsPageComponent, {
      imports: [
        TranslateTestingModule.withTranslations(configuration.language.default, translation),
        StoreModule.forRoot({}, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        }),
        StoreModule.forFeature('accountGenePanelsPage', accountGenePanelsPageReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([
          AccountGenePanelsPageRootEffects,
          AccountGenePanelsModalDetailsEffects
        ])
      ],
      declarations: [
        AccountGenePanelsPageComponent
      ],
      routes: [],
      providers: [AccountGenePanelsPageFacade]
    });

    componentInstance = component.fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

