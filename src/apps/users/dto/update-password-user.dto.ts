import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { USER_PASSWORD_MINIMUM_LENGTH } from '../constants';
import { UserMessagesEnum } from '../enums/user-error-keys.enum';

export class UpdatePasswordUserDto {
  @ApiProperty()
  @IsString({ message: UserMessagesEnum.PASSWORD_INVALID })
  @MinLength(USER_PASSWORD_MINIMUM_LENGTH, {
    message: UserMessagesEnum.PASSWORD_INVALID_LENGHT,
  })
  password: string;
}
