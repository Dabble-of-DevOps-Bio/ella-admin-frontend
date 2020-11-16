import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User, UserSelectors } from '@shared/user';
import { AuthSelectors } from '@shared/auth';

@Injectable()
export class NavbarFacade {
  public get profile$(): Observable<User> {
    return this.store.select(UserSelectors.profile);
  }

  public get isAuthenticated$(): Observable<boolean> {
    return this.store.select(AuthSelectors.isAuthenticated);
  }

  constructor(
    private store: Store<AppState>
  ) { }
}
