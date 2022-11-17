import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { PermissionDto } from 'src/apps/permissions/dto/permission.dto';

@Exclude()
export class GetUserDetailDto {
  readonly _id: string;

  @ApiProperty()
  @Expose()
  readonly uuid: string;

  @ApiProperty()
  @Expose()
  readonly name: string;

  @ApiProperty()
  @Expose()
  first_name: string;

  @ApiProperty()
  @Expose()
  second_name: string;

  @ApiProperty()
  @Expose()
  age: number;

  @ApiProperty()
  @Expose()
  date_of_birth: Date;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  ocupation: string;

  @ApiProperty()
  @Expose()
  phone: string;

  @ApiProperty()
  @Expose()
  reason: string;

  @ApiProperty()
  @Expose()
  sex: string;

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

  permissions: Array<string>;

  roles: Array<string>;

  @ApiProperty()
  @Expose()
  listPermissions: Array<Partial<PermissionDto>>;

  @ApiProperty()
  @Expose()
  ListRoles: Array<Partial<PermissionDto>>;
}
