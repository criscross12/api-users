import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class QueryUserProfileDto {
  @ApiProperty()
  @IsUUID()
  uuid: string;
}
