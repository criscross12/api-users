import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HTTP_APP_ERROR } from './errors/http-errors.error';

@Controller('help')
@ApiTags('help')
export class HelpController {
  @Get('errors')
  showErrors(@Res() res) {
    res.status(HttpStatus.ACCEPTED).send(HTTP_APP_ERROR);
  }
}
