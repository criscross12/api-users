import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { PermissionDto } from 'src/apps/permissions/dto/permission.dto';

@Exclude()
export class GetRoleDto {
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

  @ApiProperty()
  @Expose()
  readonly internal: boolean;

  readonly created_at: Date;

  readonly updated_at: Date;

  readonly locked_at: Date;

  readonly allow_all: boolean;

  permissions: Array<string>;

  listPermissions: Array<Partial<PermissionDto>>;
}
