import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PermissionMessagesEnum } from '../emuns/permission.enum';
import { PermissionsService } from '../services/permissions.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class CheckThePermissionExistByUuidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly permissionsService: PermissionsService) {}

  async validate(uuid: any) {
    const permission = await this.permissionsService.getPermissionByUuid(uuid);
    return !permission;
  }

  defaultMessage() {
    return PermissionMessagesEnum.PERMISSION_UUID_IS_INVALID;
  }
}

export function CheckThePermissionExistByUuid(
  validationOptions?: ValidationOptions,
) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckThePermissionExistByUuidConstraint,
    });
  };
}
