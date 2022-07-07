import { Injectable } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { plainToClass } from 'class-transformer';
import { PermissionsService } from 'src/apps/permissions/services/permissions.service';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';
import { IUser } from 'src/apps/auth/interfaces/user.interface';
import { GetPermissionDto } from 'src/apps/permissions/dto/get-permission.dto';
import { RoleNotFoundError } from '../errors/role-not-found.error';
import { CreateRoleAccountDto } from '../dto/create-role-account.dto';
import { GetRoleAccountDto } from '../dto/get-role-account.dto';
import { GetRoleAccountDetailDto } from '../dto/get-role-account.detail.dto';
import { UpdateRoleAccountDto } from '../dto/update-role-account.dto';

@Injectable()
export class RolesAccountsServiceApp {
  constructor(
    private readonly rolesService: RolesService,
    private readonly permissionsService: PermissionsService,
  ) {}

  async createRoleAccount(
    data: CreateRoleAccountDto,
    user: IUser,
  ): Promise<MessageResponseDto> {
    data.account_uuid = user.account_uuid;
    data.internal = false;
    await this.rolesService.createRoleAccount(data);
    return { message: 'created' };
  }

  getRolesAccount = async (user: IUser): Promise<GetRoleAccountDto[]> =>
    (await this.rolesService.getRolesAccount(user.account_uuid)).map((role) =>
      plainToClass(GetRoleAccountDto, role),
    );

  getRoleAccountByUuid = async (
    uuid: string,
    user: IUser,
  ): Promise<GetRoleAccountDetailDto> => {
    const role = await this.rolesService.getRoleAccountByUuid(
      uuid,
      user.account_uuid,
    );
    if (!role) throw new RoleNotFoundError();
    let permissions = await this.permissionsService.getPermissionsByKeys([
      ...new Set(role.permissions),
    ]);
    permissions = permissions.map((p) => plainToClass(GetPermissionDto, p));
    role.listPermissions = permissions;
    return plainToClass(GetRoleAccountDetailDto, role);
  };

  async updateRoleAccountByUuid(
    uuid: string,
    data: UpdateRoleAccountDto,
    user: IUser,
  ): Promise<MessageResponseDto> {
    await this.rolesService.updateRoleAccountByUuid(
      uuid,
      data,
      user.account_uuid,
    );
    return { message: 'updated' };
  }

  async removeRoleAccountByUuid(
    uuid: string,
    user: IUser,
  ): Promise<MessageResponseDto> {
    await this.rolesService.removeRoleAccountByUuid(uuid, user.account_uuid);
    return { message: 'deleted' };
  }
}
