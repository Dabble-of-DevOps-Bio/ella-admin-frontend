import { AppState } from '@shared/store';
import { UserSelectors } from '../store';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

@Injectable()
export class UnauthenticatedGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  public canActivate(): Observable<boolean> {
    return this.store
      .pipe(
        select(UserSelectors.isAuthenticated),
        map((isAuthenticated) => {console.log('UA', isAuthenticated);
          if (isAuthenticated) {
            this.router.navigate(['/dashboard']);
          }

          return !isAuthenticated;
        })
      );
  }
}
