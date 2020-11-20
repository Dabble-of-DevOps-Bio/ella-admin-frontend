import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { SetValueAction, MarkAsDirtyAction } from 'ngrx-forms';
import { Store } from '@ngrx/store';

@Injectable()
export class CustomSelectFacade {
  constructor(
    private store: Store<AppState>
  ) { }

  public changeOption<T>(controlID: string, optionValue: T): void {
    this.store.dispatch(new SetValueAction(controlID, optionValue));
  }

  public markAsDirty(controlID: string): void {
    this.store.dispatch(new MarkAsDirtyAction(controlID));
  }
}
