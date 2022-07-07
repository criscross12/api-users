import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetPerfilUserDto {
  @Expose()
  _id: string;

  @ApiProperty()
  @Expose()
  readonly uuid: string;

  @ApiProperty()
  @Expose()
  readonly email: string;

  @ApiProperty()
  @Expose()
  readonly user_name: string;

  @ApiProperty()
  @Expose()
  readonly image_profile: string;

  @ApiProperty()
  @Expose()
  readonly phone: string;

  @ApiProperty()
  @Expose()
  readonly enabled: boolean;

  @ApiProperty()
  @Expose()
  readonly language: string;

  @ApiProperty()
  @Expose()
  readonly internal: boolean;

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
  permissions: Array<string>;

  @ApiProperty()
  @Expose()
  roles: Array<string>;
}
