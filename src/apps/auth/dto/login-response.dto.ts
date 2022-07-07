import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginResponseDto {
  @ApiProperty()
  @Expose()
  uuid: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  time_of_live_token: string;

  @ApiProperty()
  @Expose()
  key_refresh_token: string;

  @ApiProperty()
  @Expose()
  enabled: boolean;

  @ApiProperty()
  @Expose()
  updated_at: string;

  @ApiProperty()
  @Expose()
  created_at: string;

  @ApiProperty()
  @Expose()
  permissions: string[];

  @ApiProperty()
  @Expose()
  roles: string[];

  @ApiProperty()
  @Expose()
  token: string;
}
