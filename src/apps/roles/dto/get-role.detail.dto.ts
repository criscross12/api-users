import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { PermissionDto } from 'src/apps/permissions/dto/permission.dto';

@Exclude()
export class GetRoleDetailDto {
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

  @ApiProperty()
  @Expose()
  listPermissions: Array<Partial<PermissionDto>>;

  readonly created_at: string;

  readonly updated_at: string;

  readonly locked_at: boolean;

  readonly allow_all: boolean;

  permissions: Array<string>;
}
