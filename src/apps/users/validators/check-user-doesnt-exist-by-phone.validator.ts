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
export class CheckUserDoesntExistByPhoneConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly usersService: UsersService) {}

  async validate(phone: any) {
    const user = await this.usersService.getUserByPhone(phone);
    return !user;
  }

  defaultMessage() {
    return UserMessagesEnum.USER_PHONE_IS_INVALID;
  }
}

export function CheckUserDoesntExistByPhone(
  validationOptions?: ValidationOptions,
) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckUserDoesntExistByPhoneConstraint,
    });
  };
}
