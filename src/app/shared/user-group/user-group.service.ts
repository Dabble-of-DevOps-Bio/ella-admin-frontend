import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass, classToPlain, plainToClassFromExist } from 'class-transformer';
import { UserGroup } from './models';
import { ApiService } from '@ronas-it/angular-common';
import { PaginationRequest, PaginationResponse } from '@shared/pagination';
import { UserGroupSortField } from './enums';
import { isUndefined, omitBy } from 'lodash';

@Injectable()
export class UserGroupService {
  public endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/user-groups/';
  }

  public search({ page, perPage, sortBy, desc }: {
    page?: number,
    perPage?: number,
    sortBy?: UserGroupSortField,
    desc?: boolean
  } = {}): Observable<PaginationResponse<UserGroup>> {
    const request = new PaginationRequest({ page, perPage, sortBy, desc });

    return this.apiService
      .get<PaginationResponse<UserGroup>>(this.endpoint, omitBy(classToPlain<PaginationRequest>(request), isUndefined))
      .pipe(
        map((response) => plainToClassFromExist(new PaginationResponse<UserGroup>(UserGroup), response))
      );
  }

  public create(group: UserGroup): Observable<UserGroup> {
    return this.apiService
      .post(this.endpoint, classToPlain(group))
      .pipe(
        map((response) => plainToClass(UserGroup, response))
      );
  }

  public update(group: UserGroup): Observable<void> {
    return this.apiService.put(`${this.endpoint}${group.id}/`, classToPlain(group));
  }

  public get(id: number): Observable<UserGroup> {
    return this.apiService
      .get(`${this.endpoint}${id}/`)
      .pipe(
        map((response) => plainToClass(UserGroup, response))
      );
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}${id}/`);
  }
}
