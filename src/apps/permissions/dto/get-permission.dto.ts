import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetPermissionDto {
  _id: string;

  @ApiProperty()
  @Expose()
  readonly uuid: string;

  @ApiProperty()
  @Expose()
  readonly name: string;

  @ApiProperty()
  @Expose()
  readonly key: string;

  readonly api_key: string;

  @ApiProperty()
  @Expose()
  readonly group_key: string;

  @ApiProperty()
  @Expose()
  readonly group_name: string;

  readonly internal: boolean;

  readonly created_at: Date;

  readonly locked_at: Date;
}
