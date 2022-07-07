import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CredentialsDto {
  @ApiProperty()
  @IsString()
  user: string;

  @ApiProperty()
  @IsString()
  password: string;
}
