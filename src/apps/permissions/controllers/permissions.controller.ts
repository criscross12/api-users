import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Permissions } from 'src/apps/auth/decorators/permissions.decorator';
import { AuthGuard } from 'src/apps/auth/guards/auth.guard';
import { JwtAuthGuard } from 'src/apps/auth/guards/jwt-auth.guard';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';
import { handleResponse } from 'src/apps/shared/helpers';
import { ListPermissions } from 'src/apps/shared/static/permissions';
import { PermissionsServiceApp } from '../apps/permissions.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { GetPermissionDto } from '../dto/get-permission.dto';
import { UpdatePermissionDto } from '../dto/update.permission.dto';
import { CreatePermissionPipe } from '../pipes/create-permissions.pipe';

@ApiTags('permissions')
@Controller('permissions')
@ApiBearerAuth()
export class PermissionsController {
  constructor(private readonly permissionsServiceApp: PermissionsServiceApp) {}

  @ApiResponse({ type: MessageResponseDto })
  @Permissions(ListPermissions.CREATE_PERMISSIONS)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Post()
  @UsePipes(CreatePermissionPipe)
  async create(
    @Res() res: Response,
    @Body() createPermissionDTO: CreatePermissionDto,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.permissionsServiceApp.createPermission(createPermissionDTO),
    );
  }

  @ApiResponse({ type: [GetPermissionDto] })
  @Permissions(ListPermissions.GET_PERMISSIONS)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Get()
  async getPermissions(@Res() res: Response): Promise<GetPermissionDto[]> {
    return handleResponse(res, this.permissionsServiceApp.getPermissions());
  }

  @ApiResponse({ type: GetPermissionDto })
  @Permissions(ListPermissions.GET_PERMISSIONS)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Get('/:uuid')
  async getPermission(
    @Res() res: Response,
    @Param('uuid', ParseUUIDPipe) permissionUuid: string,
  ): Promise<GetPermissionDto> {
    return handleResponse(
      res,
      this.permissionsServiceApp.getPermissionByUuid(permissionUuid),
    );
  }

  @ApiResponse({ type: [GetPermissionDto] })
  @Permissions(ListPermissions.GET_PERMISSIONS_BY_UUIDS)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Post('/find-by-uuids')
  async getPermissionsids(
    @Res() res: Response,
    @Body() uuids: string[],
  ): Promise<GetPermissionDto[]> {
    return handleResponse(
      res,
      this.permissionsServiceApp.getPermissionsByUuids(uuids),
    );
  }

  @ApiResponse({ type: MessageResponseDto })
  @Permissions(ListPermissions.UPDATE_PERMISSIONS)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Put('/:uuid')
  async updatepermission(
    @Res() res: Response,
    @Body() updatePermissionDTO: UpdatePermissionDto,
    @Param('uuid', ParseUUIDPipe) permissionUuid: string,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.permissionsServiceApp.updatePermissionByUuid(
        permissionUuid,
        updatePermissionDTO,
      ),
    );
  }

  @ApiResponse({ type: MessageResponseDto })
  @Permissions(ListPermissions.DELETE_PERMISSIONS)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Delete('/:uuid')
  deletepermission(
    @Res() res: Response,
    @Param('uuid', ParseUUIDPipe) permissionUuid: string,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.permissionsServiceApp.removePermissionByUuid(permissionUuid),
    );
  }
}
