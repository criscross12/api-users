import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
  UsePipes,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AssignPermissionsToUserDto } from '../dto/assign-permissions-to-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { DeletePermissionsToUserDto } from '../dto/delete-permissions-to-user.dto';
import { AssignRolesToUserDto } from '../dto/assign-roles-to-user.dto';
import { DeleteRolesToUserDto } from '../dto/delete-roles-to-user.dto';
import { EncriptPasswordPipe } from '../pipes/encript-password.pipe';
import { UuidUserPipe } from '../pipes/uuid-user.pipe';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiAuthGuard } from 'src/apps/shared/guards/api-auth.guard';
import { GetUserDto } from '../dto/get-user.dto';
import { handleResponse } from 'src/apps/shared/helpers';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';
import { UpdatePasswordUserDto } from '../dto/update-password-user.dto';
import { GetUserDetailDto } from '../dto/get-user-detail.dto';
import { UsersServiceApp } from '../apps/users.service';
import { UploadImageProfileDto } from '../dto/upload-images-profile.dto';
import { ImageProfile } from '../pipes/image-profile.pipe';

@ApiTags('api-users-gateway')
@ApiHeader({ name: 'api-token' })
@Controller('api-users')
@UseGuards(ApiAuthGuard)
export class ApiUsersGateway {
  constructor(private readonly usersServiceApp: UsersServiceApp) {}

  @ApiCreatedResponse({ type: GetUserDto })
  @Post()
  create(
    @Body(EncriptPasswordPipe) createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<GetUserDto> {
    return handleResponse(res, this.usersServiceApp.create(createUserDto));
  }

  @ApiCreatedResponse({ type: UploadImageProfileDto })
  @Post('/image-profile')
  @UsePipes(ImageProfile)
  uploadImage(
    @Body() uploadImageProfileDto: UploadImageProfileDto,
    @Res() res: Response,
  ) {
    return handleResponse(
      res,
      this.usersServiceApp.uploadImage(uploadImageProfileDto),
    );
  }

  @ApiOkResponse({ type: [GetUserDto] })
  @Get()
  findAll(@Res() res: Response): Promise<GetUserDto[]> {
    return handleResponse(res, this.usersServiceApp.findAll());
  }

  @ApiOkResponse({ type: GetUserDetailDto })
  @Get(':uuid')
  findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<GetUserDetailDto> {
    return handleResponse(res, this.usersServiceApp.getUserByUuid(uuid));
  }

  @ApiOkResponse({ type: MessageResponseDto })
  @Put(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.usersServiceApp.update(uuid, updateUserDto),
    );
  }

  @ApiOkResponse({ type: MessageResponseDto })
  @UsePipes(UuidUserPipe)
  @Delete(':uuid')
  remove(
    @Param('uuid', UuidUserPipe) uuid: string,
    @Res() res,
  ): Promise<MessageResponseDto> {
    return handleResponse(res, this.usersServiceApp.remove(uuid));
  }

  @ApiOkResponse({ type: MessageResponseDto })
  @Post('add-permissions')
  assingPermissionsToUser(
    @Res() res,
    @Body() assignPermissionsToUserDto: AssignPermissionsToUserDto,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.usersServiceApp.assignPermissionstoUser(assignPermissionsToUserDto),
    );
  }

  @ApiOkResponse({ type: MessageResponseDto })
  @Post('delete-permissions')
  deletePermissionsToUser(
    @Res() res,
    @Body() deletePermissionsToUserDto: DeletePermissionsToUserDto,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.usersServiceApp.deletePermissionstoUser(deletePermissionsToUserDto),
    );
  }

  @ApiOkResponse({ type: MessageResponseDto })
  @Post('add-roles')
  assingRolesToUser(
    @Res() res,
    @Body() assignRolesToUserDto: AssignRolesToUserDto,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.usersServiceApp.assignRolestoUser(assignRolesToUserDto),
    );
  }

  @ApiOkResponse({ type: MessageResponseDto })
  @Post('delete-roles')
  deleteRolesToUser(
    @Res() res,
    @Body() deleteRolesToUserDto: DeleteRolesToUserDto,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.usersServiceApp.deleteRolestoUser(deleteRolesToUserDto),
    );
  }

  @ApiOkResponse({ type: MessageResponseDto })
  @Put('password/:uuid')
  update_password(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(EncriptPasswordPipe) updatePasswordUserDto: UpdatePasswordUserDto,
    @Res() res,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.usersServiceApp.updatePassword(uuid, updatePasswordUserDto),
    );
  }
}
