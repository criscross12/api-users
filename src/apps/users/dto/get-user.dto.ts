import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { PermissionDto } from 'src/apps/permissions/dto/permission.dto';

@Exclude()
export class GetUserDto {
  _id: string;

  @ApiProperty()
  @Expose()
  readonly uuid: string;

  @ApiProperty()
  @Expose()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

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
  readonly code_confirmation: string;

  @ApiProperty()
  @Expose()
  readonly updated_at: number;

  @ApiProperty()
  @Expose()
  readonly created_at: number;

  @ApiProperty()
  @Expose()
  confirmation_at: Date;

  @ApiProperty()
  @Exclude()
  readonly deleted_at: number;

  permissions: Array<string>;
  roles: Array<string>;

  listPermissions: Array<Partial<PermissionDto>>;
  ListRoles: Array<Partial<PermissionDto>>;
}
