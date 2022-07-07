import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('app.env');
  }

  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }

  get isProduction(): boolean {
    return this.env === 'production';
  }
}
