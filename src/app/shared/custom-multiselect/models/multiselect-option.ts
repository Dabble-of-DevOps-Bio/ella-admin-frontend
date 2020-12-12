import { CustomSelectOption } from '../../custom-select';

export class CustomMultiselectOption<T extends string | number, V = any> extends CustomSelectOption<T, V> {
  public tagTitle?: string;

  constructor(model: Partial<CustomMultiselectOption<T, V>> = {}) {
    super(model);

    Object.assign(this, model);
  }
}
