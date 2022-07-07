import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthApp } from '../apps/auth.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiTags,
} from '@nestjs/swagger';
import { ApiAuthGuard } from 'src/apps/shared/guards/api-auth.guard';
import { handleResponse } from 'src/apps/shared/helpers';
import { AuthAccessDto } from '../dto/auth-access.dto';
import { Response } from 'express';
import { AuthAccessResponseDto } from '../dto/auth-access-response.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SessionTokenInterceptor } from 'src/apps/shared/interceptors/session-token.interceptor';

@Controller('api-auth')
@ApiTags('api-auth-gateway')
@ApiHeader({ name: 'api-token' })
@UsePipes(new ValidationPipe())
@UseGuards(ApiAuthGuard)
@UseInterceptors(SessionTokenInterceptor)
export class ApiAuthGateway {
  constructor(private authApp: AuthApp) {}

  @ApiCreatedResponse({ type: AuthAccessResponseDto })
  @UseGuards(ApiAuthGuard)
  @UseGuards(ApiAuthGuard, JwtAuthGuard)
  @ApiBearerAuth()
  @Post('access')
  async access(
    @Req() req,
    @Res() res: Response,
    @Body() body: AuthAccessDto,
  ): Promise<AuthAccessResponseDto> {
    return handleResponse(res, this.authApp.access(req.user, body));
  }
}
