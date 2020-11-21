import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass, classToPlain, plainToClassFromExist } from 'class-transformer';
import { UserGroup } from './models';
import { ApiService } from '@ronas-it/angular-common';
import { PaginationRequest, PaginationResponse } from '@shared/pagination';

@Injectable()
export class UserGroupService {
  public endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/user-groups/';
  }

  public search({ page, perPage, all, desc }: {
    page?: number,
    perPage?: number,
    all?: boolean,
    desc?: boolean
  } = {}): Observable<PaginationResponse<UserGroup>> {
    const request = new PaginationRequest({ page, perPage, all, desc });

    return this.apiService
      .get<PaginationResponse<UserGroup>>(this.endpoint, request)
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
