import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { AuthMessagesEnum } from '../emuns/auth-error-keys.enum';

export class CreateSessionRegistrationDto {
  @ApiProperty()
  @IsOptional()
  user_uuid: string;

  @ApiProperty()
  @IsOptional()
  uuid_device: string;

  @ApiProperty()
  @IsOptional()
  token: string;

  @ApiProperty({ required: true })
  @IsString({ message: AuthMessagesEnum.DEVICE_TOKEN_INVALID })
  @IsOptional()
  device_token: string;

  @ApiProperty()
  @IsOptional()
  key_refresh_token: string;
}
