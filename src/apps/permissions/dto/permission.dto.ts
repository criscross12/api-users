import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { PermissionMessagesEnum } from '../emuns/permission.enum';

export class PermissionDto {
  @ApiProperty()
  @IsString({ message: PermissionMessagesEnum.PERMISSION_NAME_INVALID })
  readonly name: string;

  @ApiProperty()
  @IsString({ message: PermissionMessagesEnum.key_INVALID })
  readonly key: string;

  api_key: string;

  @ApiProperty()
  @IsString({ message: PermissionMessagesEnum.GROUP_KEY_INVALID })
  readonly group_key: string;

  @ApiProperty()
  @IsString({ message: PermissionMessagesEnum.GROUP_NAME_INVALID })
  readonly group_name: string;

  @ApiProperty()
  @IsBoolean({ message: PermissionMessagesEnum.INTERNAL_INVALID })
  readonly internal: boolean;

  created_at: Date;
}
