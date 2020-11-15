import { AppState } from '@shared/store';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserSelectors } from '../store';

@Injectable()
export class IsSuperadminGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  public canActivate(): Observable<boolean> {
    return this.store
      .pipe(
        withLatestFrom(
          this.store.select(UserSelectors.profile),
          this.store.select(UserSelectors.isSuperAdministrator)
        ),
        // filter(([_, profile, __]) => !!profile.roleID),
        map(([_, __, isSuperAdministrator]) => {
          if (!isSuperAdministrator) {
            this.router.navigate(['/not-found']);
          }

          return isSuperAdministrator;
        })
      );
  }
}
