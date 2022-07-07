import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return { api: 'api_users_nutrina 1.0.0', status: 'ok' };
  }
}
