import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass, classToPlain, plainToClassFromExist } from 'class-transformer';
import { GenePanel } from './models';
import { ApiService } from '@ronas-it/angular-common';
import { PaginationRequest, PaginationResponse } from '@shared/pagination';
import { GenePanelSortField } from './enums';
import { isUndefined, omitBy } from 'lodash';

@Injectable()
export class GenePanelService {
  public endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/gene-panels/';
  }

  public search({ page, perPage, sortBy, desc, all }: {
    page?: number,
    perPage?: number,
    sortBy?: GenePanelSortField,
    desc?: boolean,
    all?: boolean
  } = {}): Observable<PaginationResponse<GenePanel>> {
    const request = new PaginationRequest({ page, perPage, sortBy, desc, all });

    return this.apiService
      .get<PaginationResponse<GenePanel>>(this.endpoint, omitBy(classToPlain<PaginationRequest>(request), isUndefined))
      .pipe(
        map((response) => plainToClassFromExist(new PaginationResponse<GenePanel>(GenePanel), response))
      );
  }

  public create(group: GenePanel): Observable<GenePanel> {
    return this.apiService
      .post(this.endpoint, classToPlain(group))
      .pipe(
        map((response) => plainToClass(GenePanel, response))
      );
  }

  public update(group: GenePanel): Observable<void> {
    return this.apiService.put(`${this.endpoint}${group.id}/`, classToPlain(group));
  }

  public get(id: number): Observable<GenePanel> {
    return this.apiService
      .get(`${this.endpoint}${id}/`)
      .pipe(
        map((response) => plainToClass(GenePanel, response))
      );
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}${id}/`);
  }
}
