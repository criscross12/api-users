import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PermissionsService } from '../services/permissions.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';
import { PermissionAlreadyExistError } from '../errors/permission-already-exist.error';
import { GetPermissionDto } from '../dto/get-permission.dto';
import { PermissionNotFoundError } from '../errors/permission-not-found.error';
import { UpdatePermissionDto } from '../dto/update.permission.dto';

@Injectable()
export class PermissionsServiceApp {
  constructor(private readonly permissionsService: PermissionsService) {}

  createPermission = async (
    data: CreatePermissionDto,
  ): Promise<MessageResponseDto> => {
    await this.permissionsService.deletePermissionByApiKey(data.api_key);
    const items = await this.permissionsService.getPermissionsByKeys(
      data.permissions.map((item) => item.key),
    );
    if (items.length > 0) throw new PermissionAlreadyExistError();
    await this.permissionsService.createPermissionList(data.permissions);
    return { message: 'created' };
  };

  getPermissions = async () =>
    (await this.permissionsService.getPermissions()).map((p) =>
      plainToClass(GetPermissionDto, p),
    );

  getPermissionById = async (id: string) => {
    const permission = await this.permissionsService.getPermissionById(id);
    if (!permission) throw new PermissionNotFoundError();
    return plainToClass(GetPermissionDto, permission);
  };

  getPermissionByUuid = async (uuid: string) => {
    const permission = await this.permissionsService.getPermissionByUuid(uuid);
    if (!permission) throw new PermissionNotFoundError();
    return plainToClass(GetPermissionDto, permission);
  };

  getPermissionsByIds = async (ids: string[]) => {
    const permission = await this.permissionsService.getPermissionsByIds(ids);
    if (!permission) throw new PermissionNotFoundError();
    return plainToClass(GetPermissionDto, permission);
  };

  getPermissionsByUuids = async (uuids: string[]) => {
    const permission = await this.permissionsService.getPermissionsByUuids(
      uuids,
    );
    if (!permission) throw new PermissionNotFoundError();
    return plainToClass(GetPermissionDto, permission);
  };

  updatePermissionByUuid = async (
    uuid: string,
    data: UpdatePermissionDto,
  ): Promise<MessageResponseDto> => {
    await this.permissionsService.updatePermissionByUuid(uuid, data);
    return { message: 'updated' };
  };

  removePermissionByUuid = async (
    uuid: string,
  ): Promise<MessageResponseDto> => {
    await this.permissionsService.removePermissionByUuid(uuid);
    return { message: 'deleted' };
  };
}
