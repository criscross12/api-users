import {
  Controller,
  Post,
  Body,
  Res,
  Put,
  UseGuards,
  Req,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import {
  ChangePasswordByRecoveryPasswordDto,
  CreateRequestForRecoveryPasswordDto,
  GetTokenForRecoveryPasswordDto,
} from '../dto/recovery-password.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterMePipe } from '../pipes/register-me.pipe';
import { Response } from 'express';
import { RegisterMeDto } from '../dto/register-me.dto';
import { EncriptPasswordPipe } from '../pipes/encript-password.pipe';
import { AuthGuard } from 'src/apps/auth/guards/auth.guard';
import { Permissions } from 'src/apps/auth/decorators/permissions.decorator';
import { ListPermissions } from 'src/apps/shared/static/permissions';
import { UpdateMeDto } from '../dto/update-me.dto';
import { handleResponse } from 'src/apps/shared/helpers';
import { GetUserDto } from '../dto/get-user.dto';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';
import { GetProfileUserDto } from '../dto/get-user-profile.dto';
import { RecoveryPasswordServiceApp } from '../apps/recovery_password.app';
import { UsersMeApp } from '../apps/users-me.app';
import { RegisterMeInterceptor } from '../interceptors/register-me.interceptor';
import { RecoveryPasswordInterceptor } from '../interceptors/recovery-password.interceptor';
import { JwtAuthGuard } from 'src/apps/auth/guards/jwt-auth.guard';
import { SessionTokenInterceptor } from 'src/apps/shared/interceptors/session-token.interceptor';

@Controller('users-me')
@ApiTags('users-me')
export class UsersMeController {
  constructor(
    private readonly usersMeApp: UsersMeApp,
    private recoveryPasswordServiceApp: RecoveryPasswordServiceApp,
  ) {}

  // @UseInterceptors(RegisterMeInterceptor)
  // @ApiCreatedResponse({ type: GetUserDto })
  // @Post('/register')
  // registerme(
  //   @Body(RegisterMePipe, EncriptPasswordPipe) registerMeDto: RegisterMeDto,
  //   @Res() res: Response,
  // ): Promise<GetUserDto> {
  //   return handleResponse(res, this.usersMeApp.registerme(registerMeDto));
  // }

  // @UseInterceptors(RecoveryPasswordInterceptor)
  // @ApiOkResponse({ type: MessageResponseDto })
  // @Post('create-request-for-recovery-password')
  // RecoveryPassword(
  //   @Res() res,
  //   @Body()
  //   createRequestForRecoveryPasswordDto: CreateRequestForRecoveryPasswordDto,
  // ): Promise<MessageResponseDto> {
  //   return handleResponse(
  //     res,
  //     this.recoveryPasswordServiceApp.createRequestForRecoveryPassword(
  //       createRequestForRecoveryPasswordDto,
  //     ),
  //   );
  // }

  @UseInterceptors(RecoveryPasswordInterceptor)
  @ApiCreatedResponse({ type: MessageResponseDto })
  @Post('/get-token-for-recovery-password')
  confirmationRecoveryPassword(
    @Body()
    getTokenForRecoveryPasswordDto: GetTokenForRecoveryPasswordDto,
    @Res() res: Response,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.recoveryPasswordServiceApp.createTokenForRecoveryPassword(
        getTokenForRecoveryPasswordDto,
      ),
    );
  }

  @UseInterceptors(RecoveryPasswordInterceptor)
  @ApiOkResponse({ type: MessageResponseDto })
  @Post('change-recovery-password')
  changeRecoveryPassword(
    @Body(EncriptPasswordPipe)
    changePasswordByRecoveryPasswordDto: ChangePasswordByRecoveryPasswordDto,
    @Res() res: Response,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.recoveryPasswordServiceApp.changePasswordByRecoveryPassword(
        changePasswordByRecoveryPasswordDto,
      ),
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: GetProfileUserDto })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(SessionTokenInterceptor)
  @Get('profile')
  async getProfile(
    @Req() req,
    @Res() res: Response,
  ): Promise<GetProfileUserDto> {
    return handleResponse(
      res,
      this.usersMeApp.getProfileUserByUuid(req.user.uuid),
    );
  }

  // TODO: Validar que este servicio funcione adecuadamente y con la seguridad requerida
  @ApiBearerAuth()
  @ApiOkResponse({ type: MessageResponseDto })
  @Permissions(ListPermissions.UPDATE_USERS)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @UseInterceptors(SessionTokenInterceptor)
  @Put('/update')
  updateme(
    @Body() updateMeDto: UpdateMeDto,
    @Res() res: Response,
    @Req() req,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.usersMeApp.updateMe(req.user.uuid, updateMeDto),
    );
  }
}
