import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Permissions } from 'src/apps/auth/decorators/permissions.decorator';
import { AuthGuard } from 'src/apps/auth/guards/auth.guard';
import { AssignPermissionsToRoleDto } from '../dto/assign-permissions-to-role.dto';
import { CreateRoleDto } from '../dto/create-role.dto';
import { DeletePermissionsToRoleDto } from '../dto/delete-permissions-to-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';
import { handleResponse } from 'src/apps/shared/helpers';
import { GetRoleDto } from '../dto/get-role.dto';
import { GetRoleDetailDto } from '../dto/get-role.detail.dto';
import { JwtAuthGuard } from 'src/apps/auth/guards/jwt-auth.guard';
import { RolesServiceApp } from '../apps/roles.service';
import { ListPermissions } from 'src/apps/shared/static/permissions';

@ApiBearerAuth()
@Controller('roles')
@ApiTags('roles')
export class RolesController {
  constructor(private readonly rolesServiceApp: RolesServiceApp) {}

  @ApiResponse({ type: MessageResponseDto })
  @Permissions(ListPermissions.CREATE_ROLES)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Post()
  async create(
    @Res() res,
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<MessageResponseDto> {
    return handleResponse(res, this.rolesServiceApp.createRole(createRoleDto));
  }

  @ApiResponse({ type: [GetRoleDto] })
  @Permissions(ListPermissions.GET_ROLES)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Get()
  async getRoles(@Res() res): Promise<GetRoleDto[]> {
    return handleResponse(res, this.rolesServiceApp.getRoles());
  }

  @ApiResponse({ type: GetRoleDetailDto })
  @Permissions(ListPermissions.GET_ROLES)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Get('/:uuid')
  async getRole(
    @Res() res,
    @Param('uuid', ParseUUIDPipe) roleUuid: string,
  ): Promise<GetRoleDetailDto> {
    return handleResponse(res, this.rolesServiceApp.getRoleByUuid(roleUuid));
  }

  @ApiResponse({ type: MessageResponseDto })
  @Permissions(ListPermissions.UPDATE_ROLES)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Put('/:uuid')
  async updateRole(
    @Res() res,
    @Body() updateRoleDTO: UpdateRoleDto,
    @Param('uuid', ParseUUIDPipe) roleUuid: string,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.rolesServiceApp.updateRoleByUuid(roleUuid, updateRoleDTO),
    );
  }

  @ApiResponse({ type: MessageResponseDto })
  @Permissions(ListPermissions.DELETE_ROLES)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Delete('/:uuid')
  async deleteRole(
    @Res() res,
    @Param('uuid', ParseUUIDPipe) roleUuid: string,
  ): Promise<MessageResponseDto> {
    return handleResponse(res, this.rolesServiceApp.removeRoleByUuid(roleUuid));
  }

  //TODO: corregir
  @ApiResponse({ type: MessageResponseDto })
  @Permissions(ListPermissions.ASSING_PERMISSIONS_TO_ROLES)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Post('add-permissions')
  assingPermissionsToRole(
    @Res() res,
    @Body() assignPermissionsToRoleDto: AssignPermissionsToRoleDto,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.rolesServiceApp.assignPermissionstoRole(assignPermissionsToRoleDto),
    );
  }

  @ApiResponse({ type: MessageResponseDto })
  @Permissions(ListPermissions.DELETE_PERMISSIONS_TO_ROLES)
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Post('delete-permissions')
  deletePermissionsToRole(
    @Res() res,
    @Body() deletePermissionsToRoleDto: DeletePermissionsToRoleDto,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.rolesServiceApp.deletePermissionstoRole(deletePermissionsToRoleDto),
    );
  }
}
