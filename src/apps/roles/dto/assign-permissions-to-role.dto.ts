import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { RoleMessagesEnum } from '../emuns/role-messages.enum';
import { CheckTheRoleExistByUuid } from '../validators/check-role-exist-by-uuid.validator';

export class AssignPermissionsToRoleDto {
  @ApiProperty()
  @IsArray({ message: RoleMessagesEnum.PERMISSIONS_UUIDS_ARE_INVALID })
  permissions: Array<string>;

  @ApiProperty()
  @CheckTheRoleExistByUuid()
  roleUuid: string;
}
