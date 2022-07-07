import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { PermissionDto } from 'src/apps/permissions/dto/permission.dto';

@Exclude()
export class GetUserLoginDto {
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
  time_of_live_token: number;

  @ApiProperty()
  @Expose()
  key_refresh_token: string;

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
  confirmation_phone_at: Date;

  @ApiProperty()
  @Expose()
  confirmation_at: Date;

  @ApiProperty()
  @Expose()
  confirmation_email_at: Date;

  @ApiProperty()
  @Expose()
  roles: Array<string>;

  listPermissions: Array<Partial<PermissionDto>>;
  ListRoles: Array<Partial<PermissionDto>>;
}
