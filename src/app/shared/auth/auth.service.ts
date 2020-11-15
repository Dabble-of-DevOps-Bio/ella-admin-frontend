import { AuthCredentials, AuthResponse, RestorePasswordRequest } from './models';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { ApiService } from '@ronas-it/angular-common';

@Injectable()
export class AuthService {
  constructor(
    private apiService: ApiService
  ) { }

  public authorize(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.apiService
      .post<AuthResponse>('/token/', credentials)
      .pipe(
        map((response) => plainToClass(AuthResponse, response))
      );
  }

  public refreshToken(): Observable<HttpResponse<void>> {
    return this.apiService.get<HttpResponse<void>>('/auth/refresh', {}, {
      observe: 'response'
    });
  }

  public forgotPassword(email: string): Observable<void> {
    return this.apiService.post('/auth/forgot-password', { email });
  }

  public restorePassword(request: RestorePasswordRequest): Observable<void> {
    return this.apiService.post('/auth/restore-password', request);
  }

  public checkRestoreToken(token: string): Observable<void> {
    return this.apiService.post('/auth/token/check', { token });
  }
}
