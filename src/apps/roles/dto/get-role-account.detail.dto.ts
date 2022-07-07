import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GetRoleDetailDto } from './get-role.detail.dto';

export class GetRoleAccountDetailDto extends GetRoleDetailDto {
  @ApiProperty()
  @Expose()
  readonly account_uuid: string;
}
