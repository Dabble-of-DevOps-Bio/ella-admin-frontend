import { Boxed } from 'ngrx-forms';

export class AccountGenPanelsDetailsForm {
  public id: number;
  public groups: Boxed<Array<number>>;
}
