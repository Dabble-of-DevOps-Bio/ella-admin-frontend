import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { ModalActions } from '@shared/modal';
import { Store } from '@ngrx/store';

@Injectable()
export class BaseModalFacade {
  constructor(
    protected store: Store<AppState>
  ) { }

  public close(modalID: string): void {
    this.store.dispatch(ModalActions.closeByID({ modalID }));
  }
}
