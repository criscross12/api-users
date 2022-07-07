import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsUUID, ValidateNested } from 'class-validator';
import { PermissionMessagesEnum } from '../emuns/permission.enum';
import { CheckThePermissionNameKeyDoesNotRepeat } from '../validators/check-permissions-name-key-does-not-repeat.validator';
import { PermissionDto } from './permission.dto';

export class CreatePermissionDto {
  @IsArray({ message: PermissionMessagesEnum.PERMISSIONS_INVALID })
  @ApiProperty({ type: [PermissionDto] })
  @Type(() => PermissionDto)
  @CheckThePermissionNameKeyDoesNotRepeat()
  @ValidateNested({ each: true })
  permissions: PermissionDto[];

  @ApiProperty()
  @IsUUID(4, { message: PermissionMessagesEnum.API_KEY_INVALID })
  readonly api_key: string;
}
