import { AppState } from '@shared/store';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthSelectors } from '../store';

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
        select(AuthSelectors.isAuthenticated),
        map((isAuthenticated) => {
          if (isAuthenticated) {
            this.router.navigate(['/users']);
          }

          return !isAuthenticated;
        })
      );
  }
}
