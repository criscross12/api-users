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
export class CheckThePermissionDoesNotExistByNameKeyConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly permissionsService: PermissionsService) {}

  async validate(key: any) {
    const permission = await this.permissionsService.getPermissionByKey(key);
    return permission ? true : false;
  }

  defaultMessage() {
    return PermissionMessagesEnum.ALREADY_EXIST;
  }
}

export function CheckThePermissionDoesNotExistByNameKey(
  validationOptions?: ValidationOptions,
) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckThePermissionDoesNotExistByNameKeyConstraint,
    });
  };
}
