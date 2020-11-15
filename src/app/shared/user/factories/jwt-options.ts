import { AppState } from '@shared/store';
import { configuration } from '@configurations';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { UserSelectors } from '../store';

export function jwtOptionsFactory(store: Store<AppState>): object {
  return {
    tokenGetter: () => {
      return store
        .pipe(
          select(UserSelectors.token),
          take(1)
        )
        .toPromise();
    },
    // whitelistedDomains: configuration.api.whitelisted_domains,
    blacklistedRoutes: configuration.api.unauthorized_routes
  };
}
