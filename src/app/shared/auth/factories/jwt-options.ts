import { AppState } from '@shared/store';
import { AuthSelectors } from '../store';
import { configuration } from '@configurations';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

export function jwtOptionsFactory(store: Store<AppState>): object {
  return {
    tokenGetter: () => {
      return store
        .pipe(
          select(AuthSelectors.token),
          take(1)
        )
        .toPromise();
    },
    // whitelistedDomains: configuration.api.whitelisted_domains,
    blacklistedRoutes: configuration.api.unauthorized_routes
  };
}
