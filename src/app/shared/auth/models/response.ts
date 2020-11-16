export class AuthResponse {
  public refresh: string;
  public access: string;

  constructor(model: Partial<AuthResponse> = {}) {
    Object.assign(this, model);
  }
}
