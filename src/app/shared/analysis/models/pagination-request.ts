import { Expose } from 'class-transformer';
import { PaginationRequest } from '@shared/pagination';

export class AnalysisPaginationRequest extends PaginationRequest {
  @Expose({ name: 'only_finalized', toPlainOnly: true })
  public onlyFinalized?: boolean;

  @Expose({ name: 'user_id' })
  public userID?: number;

  constructor(model: Partial<AnalysisPaginationRequest> = {}) {
    super(model);

    Object.assign(this, model);
  }
}
