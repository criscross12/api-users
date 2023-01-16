import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { PermissionMessagesEnum } from 'src/apps/permissions/emuns/permission.enum';
import { CheckThePermissionExist } from 'src/apps/permissions/validators/check-permission-exist.validator';
import { RoleMessagesEnum } from 'src/apps/roles/emuns/role-messages.enum';
import { CheckTheRoleExist } from 'src/apps/roles/validators/check-role-exist.validator';
import { USER_PASSWORD_MINIMUM_LENGTH } from '../constants';
import { UserMessagesEnum } from '../enums/user-error-keys.enum';
import { CheckUserDoesntExistByEmail } from '../validators/check-user-doesnt-exist-by-email.validator';
import { CheckUserExistByPhone } from '../validators/check-user-exist-by-phone.validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  second_name: string;

  @ApiProperty()
  @IsOptional()
  date_of_birth: Date;

  @ApiProperty({ example: 'email@gmail.com' })
  @IsOptional()
  @IsEmail({}, { message: UserMessagesEnum.EMAIL_INVALID })
  email: string;

  @ApiProperty()
  @IsString({ message: UserMessagesEnum.PASSWORD_INVALID })
  // @MinLength(USER_PASSWORD_MINIMUM_LENGTH, {
  //   message: UserMessagesEnum.PASSWORD_INVALID_LENGHT,
  // })
  password: string;

  @ApiProperty()
  @IsString()
  ocupation: string;

  @ApiProperty({ required: false })
  @ValidateIf(({ email }) => !email)
  //@CheckUserExistByPhone()
  @IsString({ message: UserMessagesEnum.PHONE_INVALID })
  phone: string;

  @ApiProperty()
  @IsString()
  reason: string;

  @ApiProperty()
  @IsString()
  sex: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean({ message: UserMessagesEnum.ENABLED_INVALID })
  enabled: boolean;

  created_at: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray({ message: RoleMessagesEnum.ROLE_INVALID })
  @CheckTheRoleExist()
  roles: Array<string>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray({ message: PermissionMessagesEnum.PERMISSIONS_INVALID })
  @CheckThePermissionExist()
  permissions: Array<string>;
}
