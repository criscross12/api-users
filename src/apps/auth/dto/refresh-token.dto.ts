import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AuthMessagesEnum } from '../emuns/auth-error-keys.enum';

export class RefreshTokenDto {
  @ApiProperty()
  @IsString({ message: AuthMessagesEnum.DEVICE_UUID_INVALID })
  uuid_device: string;

  @ApiProperty()
  @IsString({ message: AuthMessagesEnum.REFRESH_TOKEN_INVALID })
  key_refresh_token: string;
}
