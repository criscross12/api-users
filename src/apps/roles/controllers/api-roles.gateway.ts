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
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';
import { ApiAuthGuard } from 'src/apps/shared/guards/api-auth.guard';
import { handleResponse } from 'src/apps/shared/helpers';
import { RolesServiceApp } from '../apps/roles.service';
import { AssignPermissionsToRoleDto } from '../dto/assign-permissions-to-role.dto';
import { CreateDefaultRolesDto } from '../dto/create-default-roles.dto';
import { CreateRoleDto } from '../dto/create-role.dto';
import { DeletePermissionsToRoleDto } from '../dto/delete-permissions-to-role.dto';
import { GetRoleDetailDto } from '../dto/get-role.detail.dto';
import { GetRoleDto } from '../dto/get-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@ApiTags('api-roles-gateway')
@ApiHeader({ name: 'api-token' })
@Controller('api-roles')
@UseGuards(ApiAuthGuard)
export class ApiRolesGateway {
  constructor(private readonly rolesServiceApp: RolesServiceApp) {}

  @ApiResponse({ type: MessageResponseDto })
  @Post()
  async create(
    @Res() res,
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<MessageResponseDto> {
    return handleResponse(res, this.rolesServiceApp.createRole(createRoleDto));
  }

  @ApiResponse({ type: [GetRoleDto] })
  @Get()
  async getRoles(@Res() res): Promise<GetRoleDto[]> {
    return handleResponse(res, this.rolesServiceApp.getRoles());
  }

  @ApiResponse({ type: GetRoleDetailDto })
  @Get('/:uuid')
  async getRole(
    @Res() res,
    @Param('uuid', ParseUUIDPipe) roleUuid: string,
  ): Promise<GetRoleDetailDto> {
    return handleResponse(res, this.rolesServiceApp.getRoleByUuid(roleUuid));
  }

  @ApiResponse({ type: MessageResponseDto })
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
  @Delete('/:uuid')
  async deleteRole(
    @Res() res,
    @Param('uuid', ParseUUIDPipe) roleUuid: string,
  ): Promise<MessageResponseDto> {
    return handleResponse(res, this.rolesServiceApp.removeRoleByUuid(roleUuid));
  }

  //TODO: corregir
  @ApiResponse({ type: MessageResponseDto })
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

  @ApiResponse({ type: MessageResponseDto })
  @Post('create-default-roles')
  async createDefaultRoles(
    @Res() res,
    @Body() createDefaultRolesDto: CreateDefaultRolesDto,
  ): Promise<MessageResponseDto> {
    return handleResponse(
      res,
      this.rolesServiceApp.createDefaultRoles(createDefaultRolesDto),
    );
  }
}
