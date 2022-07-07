import { Injectable } from '@nestjs/common';
import { AssignPermissionsToRoleDto } from '../dto/assign-permissions-to-role.dto';
import { RolesService } from '../services/roles.service';
import { plainToClass } from 'class-transformer';
import { PermissionsService } from 'src/apps/permissions/services/permissions.service';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';
import { GetPermissionDto } from 'src/apps/permissions/dto/get-permission.dto';
import { UtilRole } from '../utils/index.util';
import { CreateRoleDto } from '../dto/create-role.dto';
import { GetRoleDto } from '../dto/get-role.dto';
import { RoleNotFoundError } from '../errors/role-not-found.error';
import { GetRoleDetailDto } from '../dto/get-role.detail.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { DeletePermissionsToRoleDto } from '../dto/delete-permissions-to-role.dto';
import { USER_ROLES_DEFAULTS_VALUES } from 'src/apps/users/constants';
import { CreateDefaultRolesDto } from '../dto/create-default-roles.dto';

@Injectable()
export class RolesServiceApp {
  constructor(
    private readonly rolesService: RolesService,
    private readonly utilRole: UtilRole,
    private readonly permissionsService: PermissionsService,
  ) {}

  async createRole(data: CreateRoleDto): Promise<MessageResponseDto> {
    await this.rolesService.createRole(data);
    return { message: 'created' };
  }

  getRoles = async (): Promise<GetRoleDto[]> =>
    (await this.rolesService.getRoles()).map((role) =>
      plainToClass(GetRoleDto, role),
    );

  getRoleByUuid = async (uuid: string): Promise<GetRoleDetailDto> => {
    const role = await this.rolesService.getRoleByUuid(uuid);
    if (!role) throw new RoleNotFoundError();
    let permissions = await this.permissionsService.getPermissionsByKeys([
      ...new Set(role.permissions),
    ]);
    permissions = permissions.map((p) => plainToClass(GetPermissionDto, p));
    role.listPermissions = permissions;
    return plainToClass(GetRoleDetailDto, role);
  };

  async updateRoleByUuid(
    uuid: string,
    data: UpdateRoleDto,
  ): Promise<MessageResponseDto> {
    await this.rolesService.updateRoleByUuid(uuid, data);
    return { message: 'updated' };
  }

  async removeRoleByUuid(uuid: string): Promise<MessageResponseDto> {
    await this.rolesService.removeRoleByUuid(uuid);
    return { message: 'deleted' };
  }

  async assignPermissionstoRole(
    data: AssignPermissionsToRoleDto,
  ): Promise<MessageResponseDto> {
    const role = await this.rolesService.getRoleByUuid(data.roleUuid);
    const permission = this.utilRole.mergePermisions(
      role.permissions ?? [],
      data.permissions,
    );
    await this.rolesService.updatePermissionsByRoleId(role._id, permission);
    return { message: 'updated' };
  }

  async deletePermissionstoRole(
    data: DeletePermissionsToRoleDto,
  ): Promise<MessageResponseDto> {
    const role = await this.rolesService.getRoleByUuid(data.roleUuid);
    const permission = this.utilRole.removePermissions(
      role.permissions ?? [],
      data.permissions,
    );
    await this.rolesService.updatePermissionsByRoleId(role._id, permission);
    return { message: 'updated' };
  }

  createDefaultRoles = async (createDefaultRolesDto: CreateDefaultRolesDto) => {
    await this.rolesService.createDefaultRoles(
      USER_ROLES_DEFAULTS_VALUES,
      createDefaultRolesDto.account_uuid,
    );
    return { message: 'created' };
  };
}
