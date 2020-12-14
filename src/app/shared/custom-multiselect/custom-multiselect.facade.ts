import { AppState } from '@shared/store';
import { box, SetValueAction, MarkAsDirtyAction } from 'ngrx-forms';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class CustomMultiselectFacade {
  constructor(
    private store: Store<AppState>
  ) { }

  public updateOptions(controlID: string, optionsID: Array<number | string>): void {
    this.store.dispatch(new SetValueAction(controlID, box(optionsID)));
  }

  public markAsDirty(controlID: string): void {
    this.store.dispatch(new MarkAsDirtyAction(controlID));
  }
}
