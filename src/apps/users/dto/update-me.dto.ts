import { OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { RegisterMeDto } from './register-me.dto';

@Expose()
export class UpdateMeDto extends OmitType(RegisterMeDto, [
  'email',
  'password',
  'enabled',
  'internal',
  'phone',
] as const) {}
