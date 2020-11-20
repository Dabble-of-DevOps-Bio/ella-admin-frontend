export class CustomSelectOption<T extends string | number, V = any> {
  public id: T;
  public title: string;
  public data?: V;

  constructor(model: Partial<CustomSelectOption<T, V>> = {}) {
    Object.assign(this, model);
  }
}
