import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { RoleMessagesEnum } from '../emuns/role-messages.enum';
import { CheckTheRoleDoesNotExistByNameKey } from '../validators/check-role-name-key.validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsString({ message: RoleMessagesEnum.ROLE_NAME_INVALID })
  readonly name: string;

  @ApiProperty()
  @CheckTheRoleDoesNotExistByNameKey()
  @IsString({ message: RoleMessagesEnum.key_INVALID })
  readonly key: string;

  @ApiProperty()
  @IsBoolean({ message: RoleMessagesEnum.ENABLED_INVALID })
  readonly internal: boolean;
}
