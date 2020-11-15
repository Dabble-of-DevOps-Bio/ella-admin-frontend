import { AppState } from '@shared/store';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { UserSelectors } from '../store';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  public canActivate(): Observable<boolean> {
    return this.store
      .pipe(
        select(UserSelectors.isAuthenticated),
        map((isAuthenticated) => {console.log('A', isAuthenticated);
          if (!isAuthenticated) {
            this.router.navigate(['/login']);
          }

          return isAuthenticated;
        })
      );
  }
}
