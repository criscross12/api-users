import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PermissionDto } from 'src/apps/permissions/dto/permission.dto';

@Exclude()
export class GetUserLoginDto {
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
  @IsOptional()
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
  readonly password: string;

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
