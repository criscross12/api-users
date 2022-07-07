import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserMessagesEnum } from '../enums/user-error-keys.enum';
import { UsersService } from '../services/users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class CheckUserExistByUuidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly usersService: UsersService) {}

  async validate(uuid: any) {
    const user = await this.usersService.getUserByUuid(uuid);
    if (user) return true;
    return false;
  }

  defaultMessage() {
    return UserMessagesEnum.USER_UUID_IS_INVALID;
  }
}

export function CheckUserExistByUuid(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckUserExistByUuidConstraint,
    });
  };
}
