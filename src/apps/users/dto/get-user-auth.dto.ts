import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetUserAuthDto {
  readonly _id: string;

  @ApiProperty()
  @Expose()
  readonly uuid: string;

  @ApiProperty()
  @Expose()
  readonly email: string;

  @ApiProperty()
  @Expose()
  readonly password: string;

  @ApiProperty()
  @Expose()
  readonly phone: string;

  @ApiProperty()
  @Expose()
  readonly enabled: boolean;

  @ApiProperty()
  @Expose()
  readonly updated_at: number;

  @ApiProperty()
  @Expose()
  readonly created_at: number;

  @ApiProperty()
  @Expose()
  readonly deleted_at: number;

  @ApiProperty()
  @Expose()
  confirmation_at: Date;

  @ApiProperty()
  @Expose()
  permissions: Array<string>;

  @ApiProperty()
  @Expose()
  roles: Array<string>;
}
