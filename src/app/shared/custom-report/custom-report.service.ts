import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass, classToPlain, plainToClassFromExist } from 'class-transformer';
import { CustomReport } from './models';
import { ApiService } from '@ronas-it/angular-common';
import { PaginationRequest, PaginationResponse } from '@shared/pagination';
import { CustomReportSortField } from './enums';
import { isUndefined, omitBy } from 'lodash';

@Injectable()
export class CustomReportService {
  public endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/custom-report-tests/';
  }

  public search({ page, perPage, sortBy, desc, all }: {
    page?: number,
    perPage?: number,
    sortBy?: CustomReportSortField,
    desc?: boolean,
    all?: boolean
  } = {}): Observable<PaginationResponse<CustomReport>> {
    const request = new PaginationRequest({ page, perPage, sortBy, desc, all });

    return this.apiService
      .get<PaginationResponse<CustomReport>>(this.endpoint, omitBy(classToPlain<PaginationRequest>(request), isUndefined))
      .pipe(
        map((response) => plainToClassFromExist(new PaginationResponse<CustomReport>(CustomReport), response))
      );
  }

  public update(report: CustomReport): Observable<void> {
    return this.apiService.put(`${this.endpoint}${report.id}/`, classToPlain(report));
  }

  public get(id: number): Observable<CustomReport> {
    return this.apiService
      .get(`${this.endpoint}${id}/`)
      .pipe(
        map((response) => plainToClass(CustomReport, response))
      );
  }
}
