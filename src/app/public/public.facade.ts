import { AppState } from '@shared/store';
import { FormGroupState } from 'ngrx-forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NavigationSelectors } from '@shared/navigation';
import { map } from 'rxjs/operators';

@Injectable()
export class PublicFacade {
  public get isResetPasswordPage$(): Observable<boolean> {
    return this.store.select(NavigationSelectors.selectUrl)
      .pipe(
        map((url) => !url.indexOf('/reset-password'))
      );
  }

  constructor(
    private store: Store<AppState>
  ) { }

}
