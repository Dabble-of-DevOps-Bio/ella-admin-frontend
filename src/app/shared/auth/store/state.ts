export class AuthState {
  public token: string;
  public isTokenRefreshing: boolean;

  constructor() {
    this.token = localStorage.getItem('token') || null;
    this.isTokenRefreshing = false;
  }
}
