import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass, classToPlain } from 'class-transformer';
import { User } from './models';
import { ApiService } from '@ronas-it/angular-common';

@Injectable()
export class UserService {
  public endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/users/';
  }

  public profile(): Observable<User> {
    return this.apiService
      .get<User>('/profile/')
      .pipe(
        map((profile) => plainToClass(User, profile))
      );
  }

  public updateProfile(user: User): Observable<User> {
    return this.apiService
      .put('/profile/', classToPlain(user))
      .pipe(
        map((response) => plainToClass(User, response))
      );
  }

  /*public search({ hideNamesOnLeaderboard, page, perPage, filters, all, relations, orderBy, desc }: {
    hideNamesOnLeaderboard?: boolean,
    page?: number,
    perPage?: number,
    filters?: UserFilters,
    all?: boolean,
    relations?: Array<UserRelationType>,
    orderBy?: UserOrderByEnum
    desc?: boolean
  } = {}): Observable<PaginationResponse<User>> {
    const request = new UserPaginationRequest({ hideNamesOnLeaderboard, page, perPage, ...filters, all, relations, orderBy, desc });

    return this.apiService
      .get<PaginationResponse<User>>(this.endpoint, omitBy(classToPlain<UserPaginationRequest>(request), isUndefined))
      .pipe(
        map((response) => plainToClassFromExist(new PaginationResponse<User>(User), response))
      );
  }*/

  public create(user: User): Observable<User> {
    return this.apiService
      .post(this.endpoint, classToPlain(user))
      .pipe(
        map((response) => plainToClass(User, response))
      );
  }

  public update(user: User): Observable<void> {
    return this.apiService.put(`${this.endpoint}/${user.id}`, classToPlain(user));
  }

  public get(id: number): Observable<User> {
    return this.apiService
      .get(`${this.endpoint}/${id}`)
      .pipe(
        map((response) => plainToClass(User, response))
      );
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }
}
