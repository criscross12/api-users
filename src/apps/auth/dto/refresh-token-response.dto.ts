import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RefreshTokenResponseDto {
  @ApiProperty()
  @Expose()
  token: string;

  @ApiProperty()
  @Expose()
  tokenExpiration: string;

  @ApiProperty()
  @Expose()
  refreshToken: string;

  @ApiProperty()
  @Expose()
  user_uuid: string;
}
