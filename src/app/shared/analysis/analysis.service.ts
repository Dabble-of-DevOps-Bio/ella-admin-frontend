import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass, classToPlain, plainToClassFromExist } from 'class-transformer';
import { Analysis } from './models';
import { ApiService } from '@ronas-it/angular-common';
import { PaginationRequest, PaginationResponse } from '@shared/pagination';
import { AnalysisSortField } from './enums';
import { isUndefined, omitBy } from 'lodash';

@Injectable()
export class AnalysisService {
  public endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/analysis/';
  }

  public search({ page, perPage, sortBy, desc, all }: {
    page?: number,
    perPage?: number,
    sortBy?: AnalysisSortField,
    desc?: boolean,
    all?: boolean
  } = {}): Observable<PaginationResponse<Analysis>> {
    const request = new PaginationRequest({ page, perPage, sortBy, desc, all });

    return this.apiService
      .get<PaginationResponse<Analysis>>(this.endpoint, omitBy(classToPlain<PaginationRequest>(request), isUndefined))
      .pipe(
        map((response) => plainToClassFromExist(new PaginationResponse<Analysis>(Analysis), response))
      );
  }

  public create(group: Analysis): Observable<Analysis> {
    return this.apiService
      .post(this.endpoint, classToPlain(group))
      .pipe(
        map((response) => plainToClass(Analysis, response))
      );
  }

  public update(group: Analysis): Observable<void> {
    return this.apiService.put(`${this.endpoint}${group.id}/`, classToPlain(group));
  }

  public get(id: number): Observable<Analysis> {
    return this.apiService
      .get(`${this.endpoint}${id}/`)
      .pipe(
        map((response) => plainToClass(Analysis, response))
      );
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}${id}/`);
  }
}
