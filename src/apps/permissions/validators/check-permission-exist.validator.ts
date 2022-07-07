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
export class CheckThePermissionExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly permissionsService: PermissionsService) {}

  async validate(key: any) {
    const permission = await this.permissionsService.getPermissionsByKeys(key);
    return permission.length == key.length ? true : false;
  }

  defaultMessage() {
    return PermissionMessagesEnum.NOT_FOUND;
  }
}

export function CheckThePermissionExist(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckThePermissionExistConstraint,
    });
  };
}
