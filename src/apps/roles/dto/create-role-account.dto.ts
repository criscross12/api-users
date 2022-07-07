import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { RoleMessagesEnum } from '../emuns/role-messages.enum';

export class CreateRoleAccountDto {
  @ApiProperty()
  @IsString({ message: RoleMessagesEnum.ROLE_NAME_INVALID })
  readonly name: string;

  @ApiProperty()
  @IsArray({ message: RoleMessagesEnum.PERMISSIONS_NAME_INVALID })
  readonly permissions: Array<string>;

  account_uuid: string;
  internal: boolean;
}
