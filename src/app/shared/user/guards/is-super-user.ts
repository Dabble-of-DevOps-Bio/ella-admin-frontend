import { AppState } from '@shared/store';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserSelectors } from '../store';

@Injectable()
export class IsSuperUserGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  public canActivate(): Observable<boolean> {
    return this.store
      .pipe(
        withLatestFrom(
          this.store.select(UserSelectors.profile),
          this.store.select(UserSelectors.isSuperUser)
        ),
        filter(([_, profile, __]) => !!profile.isSuperUser),
        map(([_, __, isSuperUser]) => {
          if (!isSuperUser) {
            this.router.navigate(['/not-found']);
          }

          return isSuperUser;
        })
      );
  }
}
