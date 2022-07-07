import { PipeTransform, Injectable } from '@nestjs/common';
import { UtilPermission } from '../utils/index.util';
import { CreatePermissionDto } from '../dto/create-permission.dto';

@Injectable()
export class CreatePermissionPipe implements PipeTransform {
  constructor(private readonly utilPermission: UtilPermission) {}
  transform(data: CreatePermissionDto) {
    data.permissions = this.utilPermission.addApiKeyToPermission(
      data.permissions,
      data.api_key,
    );
    return data;
  }
}
