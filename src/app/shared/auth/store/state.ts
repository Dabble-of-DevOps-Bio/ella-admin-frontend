export class AuthState {
  public token: string;
  public refreshToken: string;
  public isTokenRefreshing: boolean;

  constructor() {
    this.token = localStorage.getItem('token') || null;
    this.refreshToken = localStorage.getItem('refresh_token') || null;
    this.isTokenRefreshing = false;
  }
}
