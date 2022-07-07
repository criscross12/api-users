export class DbConnectionService {
  private env;

  constructor() {
    this.env = process.env;
  }

  public getDBConection(): string {
    return `mongodb://${this.env.DB_USER}:${this.env.DB_PASS}@${this.env.DB_HOST}:${this.env.DB_PORT}/${this.env.DB_DATABASE}`;
  }

  public optionsDB(): object {
    return Object({});
  }
}
