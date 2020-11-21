import { AppState } from '@shared/store';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserSelectors } from '../store';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  public canActivate(): Observable<boolean> {
    return this.store
      .pipe(
        withLatestFrom(
          this.store.select(UserSelectors.isAdmin)
        ),
        map(([_, isAdmin]) => {
          if (!isAdmin) {
            this.router.navigate(['/']);
          }

          return isAdmin;
        })
      );
  }
}
