import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass, classToPlain, plainToClassFromExist } from 'class-transformer';
import { GenPanel } from './models';
import { ApiService } from '@ronas-it/angular-common';
import { PaginationRequest, PaginationResponse } from '@shared/pagination';
import { GenPanelSortField } from './enums';
import { isUndefined, omitBy } from 'lodash';

@Injectable()
export class GenPanelService {
  public endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/gene-panels/';
  }

  public search({ page, perPage, sortBy, desc, all }: {
    page?: number,
    perPage?: number,
    sortBy?: GenPanelSortField,
    desc?: boolean,
    all?: boolean
  } = {}): Observable<PaginationResponse<GenPanel>> {
    const request = new PaginationRequest({ page, perPage, sortBy, desc, all });

    return this.apiService
      .get<PaginationResponse<GenPanel>>(this.endpoint, omitBy(classToPlain<PaginationRequest>(request), isUndefined))
      .pipe(
        map((response) => plainToClassFromExist(new PaginationResponse<GenPanel>(GenPanel), response))
      );
  }

  public create(group: GenPanel): Observable<GenPanel> {
    return this.apiService
      .post(this.endpoint, classToPlain(group))
      .pipe(
        map((response) => plainToClass(GenPanel, response))
      );
  }

  public update(group: GenPanel): Observable<void> {
    return this.apiService.put(`${this.endpoint}${group.id}/`, classToPlain(group));
  }

  public get(id: number): Observable<GenPanel> {
    return this.apiService
      .get(`${this.endpoint}${id}/`)
      .pipe(
        map((response) => plainToClass(GenPanel, response))
      );
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}${id}/`);
  }
}
