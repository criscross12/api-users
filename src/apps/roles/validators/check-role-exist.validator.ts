import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RoleMessagesEnum } from '../emuns/role-messages.enum';
import { RolesService } from '../services/roles.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class CheckTheRoleExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly rolesService: RolesService) {}

  async validate(key: any) {
    const role = await this.rolesService.getRoleByKeys(key);
    return role.length == key.length ? true : false;
  }

  defaultMessage() {
    return RoleMessagesEnum.NOT_FOUND;
  }
}

export function CheckTheRoleExist(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckTheRoleExistConstraint,
    });
  };
}
