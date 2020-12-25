import { Boxed } from 'ngrx-forms';

export class AccountGenePanelsDetailsForm {
  public id: number;
  public groups: Boxed<Array<number>>;
}
