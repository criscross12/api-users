import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PermissionDto } from '../dto/permission.dto';
import { PermissionMessagesEnum } from '../emuns/permission.enum';

@ValidatorConstraint({ async: true })
@Injectable()
export class CheckThePermissionNameKeyDoesNotRepeatConstraint
  implements ValidatorConstraintInterface
{
  namekeysRepeat = [];

  async validate(permissions: Array<PermissionDto>) {
    if (!permissions) return true;
    let flat = true;
    const keys = [];
    for (const permission of permissions) {
      keys.push(permission.key);
      const items = permissions.filter((p) => p.key == permission.key);
      if (items.length > 1) {
        flat = false;
      }
    }
    return flat;
  }

  defaultMessage() {
    return PermissionMessagesEnum.NAME_KEYS_REPEAT;
  }
}

export function CheckThePermissionNameKeyDoesNotRepeat(
  validationOptions?: ValidationOptions,
) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckThePermissionNameKeyDoesNotRepeatConstraint,
    });
  };
}
