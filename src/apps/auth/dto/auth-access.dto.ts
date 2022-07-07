import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class AuthAccessDto {
  @ApiProperty()
  @IsArray()
  permissions: string[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  roles: string[];
}
