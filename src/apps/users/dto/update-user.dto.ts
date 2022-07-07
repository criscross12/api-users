import { PartialType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

@Expose()
export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), [
  'email',
  'password',
] as const) {}
