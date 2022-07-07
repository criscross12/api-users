import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class AuthAccessResponseDto {
  @ApiProperty()
  @IsString()
  uuid: string;

  @ApiProperty()
  @IsBoolean()
  access: boolean;
}
