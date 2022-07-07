import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { RoleMessagesEnum } from '../emuns/role-messages.enum';

export class CreateDefaultRolesDto {
  @ApiProperty()
  @IsUUID(4, { message: RoleMessagesEnum.ACCOUNT_UUID_INVALID })
  readonly account_uuid: string;
}
