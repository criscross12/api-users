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
export class CheckUserDoesntExistByEmailConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly usersService: UsersService) {}

  async validate(email: any) {
    const user = await this.usersService.getUserByEmail(email);
    return !user;
  }

  defaultMessage() {
    return UserMessagesEnum.ALREADY_EXIST;
  }
}

export function CheckUserDoesntExistByEmail(
  validationOptions?: ValidationOptions,
) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckUserDoesntExistByEmailConstraint,
    });
  };
}
