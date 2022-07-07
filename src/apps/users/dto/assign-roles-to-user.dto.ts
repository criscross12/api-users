import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { UserMessagesEnum } from '../enums/user-error-keys.enum';
import { CheckUserExistByUuid } from '../validators/check-user-exist-by-uuid.validator';

export class AssignRolesToUserDto {
  @ApiProperty()
  @IsArray({ message: UserMessagesEnum.ROLES_UUIDS_ARE_INVALID })
  roles: Array<string>;

  @ApiProperty()
  @CheckUserExistByUuid()
  userUuid: string;
}
