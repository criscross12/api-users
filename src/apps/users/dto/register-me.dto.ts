import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import {} from 'class-transformer';
import { CheckUserDoesntExistByEmail } from '../validators/check-user-doesnt-exist-by-email.validator';
import { CheckUserDoesntExistByPhone } from '../validators/check-user-doesnt-exist-by-phone.validator';
import { UserMessagesEnum } from '../enums/user-error-keys.enum';
import { USER_PASSWORD_MINIMUM_LENGTH } from '../constants';
import { PermissionDto } from 'src/apps/permissions/dto/permission.dto';

export class RegisterMeDto {
  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail({}, { message: UserMessagesEnum.EMAIL_INVALID })
  @CheckUserDoesntExistByEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty()
  @IsString({ message: UserMessagesEnum.PASSWORD_INVALID })
  @MinLength(USER_PASSWORD_MINIMUM_LENGTH, {
    message: UserMessagesEnum.PASSWORD_INVALID_LENGHT,
  })
  readonly password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: UserMessagesEnum.USER_NAME_INVALID })
  user_name: string;

  @ApiProperty({ required: false })
  @IsString({ message: UserMessagesEnum.PHONE_INVALID })
  @ValidateIf(({ email }) => !email)
  @CheckUserDoesntExistByPhone()
  readonly phone: string;

  key_refresh_token: string;
  enabled: boolean;
  language: string;
  internal: boolean;
  permissions: Array<string>;
  roles: Array<string>;
  confirmation_at: Date;
  listPermissions: Array<Partial<PermissionDto>>;
  ListRoles: Array<Partial<PermissionDto>>;
}
