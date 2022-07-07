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
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';
import { ApiAuthGuard } from 'src/apps/shared/guards/api-auth.guard';
import { handleResponse } from 'src/apps/shared/helpers';
import { PermissionsServiceApp } from '../apps/permissions.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { GetPermissionDto } from '../dto/get-permission.dto';
import { UpdatePermissionDto } from '../dto/update.permission.dto';
import { CreatePermissionPipe } from '../pipes/create-permissions.pipe';

@ApiTags('api-permissions-gateway')
@ApiHeader({ name: 'api-token' })
@Controller('api-permissions')
@UseGuards(ApiAuthGuard)
export class ApiPermissionsGateway {
  constructor(private readonly permissionsServiceApp: PermissionsServiceApp) {}

  @ApiResponse({ type: MessageResponseDto })
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
  @Get()
  async getPermissions(@Res() res: Response): Promise<GetPermissionDto[]> {
    return handleResponse(res, this.permissionsServiceApp.getPermissions());
  }

  @ApiResponse({ type: GetPermissionDto })
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
