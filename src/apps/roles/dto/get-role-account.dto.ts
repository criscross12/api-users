import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GetRoleDto } from './get-role.dto';

export class GetRoleAccountDto extends GetRoleDto {
  @ApiProperty()
  @Expose()
  account_uuid: string;
}
