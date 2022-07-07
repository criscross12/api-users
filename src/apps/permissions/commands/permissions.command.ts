import { Command } from 'nestjs-command';
import { Injectable, Logger } from '@nestjs/common';
import PERMISSION_JSON from 'src/apps/shared/static/permissions.json';
import { plainToClass } from 'class-transformer';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { PermissionsServiceApp } from '../apps/permissions.service';
import { PermissionDto } from '../dto/permission.dto';

@Injectable()
export class PermissionsCommand {
  constructor(
    private readonly permissionsServiceApp: PermissionsServiceApp,
    private readonly logger: Logger,
  ) {}

  @Command({
    command: 'create:permissions',
    describe: 'Crear permisos.',
  })
  async create() {
    const permissions = PERMISSION_JSON.permissions;
    const listPermissions = permissions.map((p) => {
      return plainToClass(PermissionDto, {
        ...p,
        api_key: 'bf81d5cb-9fd2-4f29-9e62-0383b3014526',
      });
    });
    const createPermission = plainToClass(CreatePermissionDto, {
      permissions: listPermissions,
      api_key: 'bf81d5cb-9fd2-4f29-9e62-0383b3014526',
    });
    await this.permissionsServiceApp.createPermission(createPermission);
    this.logger.log('PERMISOS INSERTADOS EXITOSAMENTE!!!!!!!!!!');
  }
}
