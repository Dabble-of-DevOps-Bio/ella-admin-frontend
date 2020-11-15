import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass, classToPlain } from 'class-transformer';
import { LoginCredentials, LoginResponse, User } from './models';
import { UserRelationType, UserWithCountType } from './types';
import { ApiService } from '@ronas-it/angular-common';

@Injectable()
export class UserService {
  public endpoint: string;

  constructor(
    private apiService: ApiService
  ) {
    this.endpoint = '/users/actions';
  }

  public login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.apiService
      .post<LoginResponse>('/login/', credentials)
      .pipe(
        map((response) => plainToClass(LoginResponse, response))
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

  /*public get(id: number, params: {
    relations?: Array<UserRelationType>,
    withCount?: Array<UserWithCountType>
  } = {}): Observable<User> {
    const request = new ProfileRequest({ ...params });

    return this.apiService
      .get(`${this.endpoint}/${id}`, classToPlain<ProfileRequest>(request))
      .pipe(
        map((response) => plainToClass(User, response))
      );
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }*/
}
