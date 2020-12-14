import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass, classToPlain, plainToClassFromExist } from 'class-transformer';
import { Analysis, AnalysisFilters, AnalysisPaginationRequest, AnalysisPatientData, AnalysisVariantReport } from './models';
import { ApiService } from '@ronas-it/angular-common';
import { PaginationResponse } from '@shared/pagination';
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

  public search({ filters, page, perPage, sortBy, desc, all }: {
    filters?: AnalysisFilters,
    page?: number,
    perPage?: number,
    sortBy?: AnalysisSortField,
    desc?: boolean,
    all?: boolean
  } = {}): Observable<PaginationResponse<Analysis>> {
    const request = new AnalysisPaginationRequest({ ...filters, page, perPage, sortBy, desc, all });

    return this.apiService
      .get<PaginationResponse<Analysis>>(this.endpoint, omitBy(classToPlain<AnalysisPaginationRequest>(request), isUndefined))
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

  public getVariantReport(id: number): Observable<AnalysisVariantReport> {
    return this.apiService
      .get(`${this.endpoint}${id}/variant-report/`)
      .pipe(
        map((response) => plainToClass(AnalysisVariantReport, response))
      );
  }

  public getPatientData(id: number): Observable<AnalysisPatientData> {
    return this.apiService
      .get(`${this.endpoint}${id}/patient-data/`)
      .pipe(
        map((response) => plainToClass(AnalysisPatientData, response))
      );
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}${id}/`);
  }
}
