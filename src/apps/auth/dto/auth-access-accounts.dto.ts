import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class AuthAccessAccountsDto {
  @ApiProperty()
  @IsArray()
  permissions: string[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  accounts: string[];
}
