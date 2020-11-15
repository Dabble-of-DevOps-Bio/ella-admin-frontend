export class LoginCredentials {
  public username: string;
  public password: string;

  constructor(model: Partial<LoginCredentials> = {}) {
    Object.assign(this, model);
  }
}
