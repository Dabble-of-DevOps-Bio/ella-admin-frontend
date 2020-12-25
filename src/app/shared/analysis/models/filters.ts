export class AnalysisFilters {
  public onlyFinalized?: boolean;
  public userID?: number;

  constructor(model: Partial<AnalysisFilters> = {}) {
    Object.assign(this, model);
  }
}
