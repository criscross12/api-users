import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { CheckThePermissionExist } from 'src/apps/permissions/validators/check-permission-exist.validator';
import { RoleMessagesEnum } from '../emuns/role-messages.enum';
import { CheckTheRoleDoesNotExistByNameKey } from '../validators/check-role-name-key.validator';

export class UpdateRoleDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: RoleMessagesEnum.ROLE_NAME_INVALID })
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @CheckTheRoleDoesNotExistByNameKey()
  @IsString({ message: RoleMessagesEnum.key_INVALID })
  readonly key: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean({ message: RoleMessagesEnum.ENABLED_INVALID })
  readonly internal: boolean;

  @ApiProperty()
  @IsOptional()
  @IsArray({ message: RoleMessagesEnum.PERMISSION_KEY_INVALID })
  @CheckThePermissionExist()
  permissions: Array<string>;
}
