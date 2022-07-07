import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PermissionsService } from '../services/permissions.service';
import { GetPermissionDto } from '../dto/get-permission.dto';
import { PermissionNotFoundError } from '../errors/permission-not-found.error';

@Injectable()
export class PermissionsAccountServiceApp {
  constructor(private readonly permissionsService: PermissionsService) {}

  getPermissionsAccount = async () =>
    (await this.permissionsService.getPermissions()).map((p) =>
      plainToInstance(GetPermissionDto, p),
    );

  getPermissionAccountByUuid = async (uuid: string) => {
    const permission = await this.permissionsService.getPermissionByUuid(uuid);
    if (!permission) throw new PermissionNotFoundError();
    return plainToInstance(GetPermissionDto, permission);
  };
}
