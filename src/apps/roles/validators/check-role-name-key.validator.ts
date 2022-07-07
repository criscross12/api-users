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
export class CheckTheRoleDoesNotExistByNameKeyConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly rolesService: RolesService) {}

  async validate(key: any) {
    const role = await this.rolesService.getRoleByNameKey(key);
    return !role;
  }

  defaultMessage() {
    return RoleMessagesEnum.ALREADY_EXIST;
  }
}

export function CheckTheRoleDoesNotExistByNameKey(
  validationOptions?: ValidationOptions,
) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckTheRoleDoesNotExistByNameKeyConstraint,
    });
  };
}
