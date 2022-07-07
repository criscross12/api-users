import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { enumToArray } from 'src/apps/shared/helpers';
import { USER_PASSWORD_MINIMUM_LENGTH } from '../constants';
import { RecoveryPasswordMethodsEnum } from '../enums/recovery-password-method.enum';
import { UserMessagesEnum } from '../enums/user-error-keys.enum';
import { CheckUserExistByEmail } from '../validators/check-user-exist-by-email.validator';
import { CheckUserExistByPhone } from '../validators/check-user-exist-by-phone.validator';

export class CreateRequestForRecoveryPasswordDto {
  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail({}, { message: UserMessagesEnum.EMAIL_INVALID })
  @CheckUserExistByEmail()
  @ValidateIf((object) => {
    return object.recovery_password_method == RecoveryPasswordMethodsEnum.EMAIL;
  })
  email: string;

  @ApiProperty({ example: '+527227010182' })
  @CheckUserExistByPhone()
  @ValidateIf((object) => {
    return object.recovery_password_method == RecoveryPasswordMethodsEnum.PHONE;
  })
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(enumToArray(RecoveryPasswordMethodsEnum), {
    message: UserMessagesEnum.RECOVERY_PASSWORD_METHOD_INVALID,
  })
  recovery_password_method: RecoveryPasswordMethodsEnum;

  user_uuid: string;
  recovery_password_code: string;
}

export class GetTokenForRecoveryPasswordDto extends CreateRequestForRecoveryPasswordDto {
  @ApiProperty()
  @IsString({ message: UserMessagesEnum.RECOVERY_PASSWORD_CODE_INVALID })
  readonly recovery_password_code: string;

  recovery_password_token: string;
}

export class ChangePasswordByRecoveryPasswordDto extends CreateRequestForRecoveryPasswordDto {
  @ApiProperty()
  @IsString({ message: UserMessagesEnum.RECOVERY_PASSWORD_CODE_INVALID })
  recovery_password_token: string;

  @ApiProperty()
  @IsString({ message: UserMessagesEnum.PASSWORD_INVALID })
  @MinLength(USER_PASSWORD_MINIMUM_LENGTH, {
    message: UserMessagesEnum.PASSWORD_INVALID_LENGHT,
  })
  password: string;
}
