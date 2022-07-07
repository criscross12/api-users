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
export class CheckTheRoleExistByUuidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly rolesService: RolesService) {}

  async validate(uuid: any) {
    if (!uuid) return false;
    const role = await this.rolesService.getRoleByUuid(uuid);
    return !!role;
  }

  defaultMessage() {
    return RoleMessagesEnum.ROLE_UUID_IS_INVALID;
  }
}

export function CheckTheRoleExistByUuid(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckTheRoleExistByUuidConstraint,
    });
  };
}
