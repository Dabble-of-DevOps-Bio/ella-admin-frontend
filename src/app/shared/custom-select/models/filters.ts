export class CustomSelectFilters {
  public query?: string;

  constructor(model: Partial<CustomSelectFilters> = {}) {
    Object.assign(this, model);
  }
}
