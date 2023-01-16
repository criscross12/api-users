import {
  Body,
  Controller,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { handleResponse } from 'src/apps/shared/helpers';
import { Response } from 'express';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { AuthApp } from '../apps/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CreateSessionRegistrationDto } from '../dto/create-session-registration.dto';
import { AuthGuard } from '../guards/auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { User } from '../decorators/user.decorator';
import { RefreshTokenResponseDto } from '../dto/refresh-token-response.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Controller('auth')
@ApiTags('Auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private authApp: AuthApp, private logger: Logger) {}

  @ApiCreatedResponse({ type: LoginResponseDto })
  @ApiBody({ type: CredentialsDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req,
    @Res() res: Response,
    @Body() createSessionRegistrationDto: CreateSessionRegistrationDto,
  ): Promise<LoginResponseDto> {
    this.logger.log('User with uuid: ' + req.user.uuid + ' logged');
    return handleResponse(
      res,
      this.authApp.login(req.user, createSessionRegistrationDto),
    );
  }

  @UseGuards(JwtAuthGuard, AuthGuard)
  @ApiBearerAuth()
  @Post('logout')
  async logout(@User() user, @Res() res: Response) {
    return handleResponse(res, this.authApp.logout(user));
  }

  @ApiCreatedResponse({ type: RefreshTokenResponseDto })
  @ApiBody({ type: RefreshTokenDto })
  @Post('refreshToken')
  async refreshToken(
    @Body() createSessionRegistrationDto: CreateSessionRegistrationDto,
    @Res() res: Response,
  ): Promise<RefreshTokenResponseDto> {
    return handleResponse(
      res,
      this.authApp.refreshToken(createSessionRegistrationDto),
    );
  }
}
