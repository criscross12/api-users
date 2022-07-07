import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { UserMessagesEnum } from '../enums/user-error-keys.enum';
import { CheckUserExistByUuid } from '../validators/check-user-exist-by-uuid.validator';

export class AssignPermissionsToUserDto {
  @ApiProperty()
  @IsArray({ message: UserMessagesEnum.PERMISSIONS_UUIDS_ARE_INVALID })
  permissions: Array<string>;

  @ApiProperty()
  @CheckUserExistByUuid()
  userUuid: string;
}
