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

  public refreshToken(token: string): Observable<AuthResponse> {
    return this.apiService
      .post<HttpResponse<void>>('/token/refresh/', { refresh: token })
      .pipe(
        map((response) => plainToClass(AuthResponse, response))
      );
  }

  public resetPassword(email: string): Observable<void> {
    return this.apiService.post('/password-reset/', { email });
  }

  public setNewPassword(password: string, token: string): Observable<void> {
    return this.apiService.post('/password-reset/confirm/', { password, token });
  }

  public checkRestoreToken(token: string): Observable<void> {
    return this.apiService.post('/password-reset/validate_token/', { token });
  }

  public clientAppAuthorize(): Observable<void> {
    return this.apiService.post('/staff-app-login/', null, { withCredentials: true });
  }
}
