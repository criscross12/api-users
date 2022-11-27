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
import { UpdatePasswordUserDto } from '../dto/update-password-user.dto';
import { EncriptPasswordPipe } from '../pipes/encript-password.pipe';
import { AuthGuard } from 'src/apps/auth/guards/auth.guard';
import { Permissions } from 'src/apps/auth/decorators/permissions.decorator';
import { ListPermissions } from 'src/apps/shared/static/permissions';
import { UuidUserPipe } from '../pipes/uuid-user.pipe';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { handleResponse } from 'src/apps/shared/helpers';
import { GetUserDto } from '../dto/get-user.dto';
import { GetUserDetailDto } from '../dto/get-user-detail.dto';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';
import { UsersServiceApp } from '../apps/users.service';
import { JwtAuthGuard } from 'src/apps/auth/guards/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersServiceApp: UsersServiceApp) {}

  @ApiCreatedResponse({ type: GetUserDto })
  @Permissions(ListPermissions.CREATE_USERS)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Post()
  create(
    @Body(EncriptPasswordPipe) createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<GetUserDto> {
    console.log(createUserDto);
    return handleResponse(res, this.usersServiceApp.create(createUserDto));
  }

  @Permissions(ListPermissions.GET_USERS)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @ApiOkResponse({ type: [GetUserDto] })
  @Get()
  findAll(@Res() res: Response): Promise<GetUserDto[]> {
    return handleResponse(res, this.usersServiceApp.findAll());
  }

  @ApiOkResponse({ type: GetUserDto })
  @Permissions(ListPermissions.GET_USERS)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Get(':uuid')
  findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<GetUserDetailDto> {
    return handleResponse(res, this.usersServiceApp.findOne(uuid));
  }

  @ApiOkResponse({ type: MessageResponseDto })
  @Permissions(ListPermissions.UPDATE_USERS)
  @UseGuards(JwtAuthGuard, AuthGuard)
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
  @Permissions(ListPermissions.DELETE_USERS)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @UsePipes(UuidUserPipe)
  @Delete(':uuid')
  remove(
    @Param('uuid', UuidUserPipe) uuid: string,
    @Res() res,
  ): Promise<MessageResponseDto> {
    return handleResponse(res, this.usersServiceApp.remove(uuid));
  }

  @ApiOkResponse({ type: MessageResponseDto })
  @Permissions(ListPermissions.ASSING_PERMISSIONS_USERS)
  @UseGuards(JwtAuthGuard, AuthGuard)
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
  @Permissions(ListPermissions.DELETE_PERMISSIONS_USERS)
  @UseGuards(JwtAuthGuard, AuthGuard)
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
  @Permissions(ListPermissions.ASSING_ROLES_USERS)
  @UseGuards(JwtAuthGuard, AuthGuard)
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
  @Permissions(ListPermissions.DELETE_ROLES_USERS)
  @UseGuards(JwtAuthGuard, AuthGuard)
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
  @Permissions(ListPermissions.UPDATE_PASSWORD_USERS)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Put('/password/:uuid')
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
