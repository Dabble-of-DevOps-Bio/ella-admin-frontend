import { AppState } from '@shared/store';
import { FormGroupState } from 'ngrx-forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User, UserSelectors } from '@shared/user';
import { AuthActions } from '@shared/auth';

@Injectable()
export class AccountProfilePageFacade {
  public get profile$(): Observable<User> {
    return this.store.select(UserSelectors.profile);
  }

  constructor(
    private store: Store<AppState>
  ) { }

  public logout(): void {
    this.store.dispatch(AuthActions.unauthorize());
  }
}
