import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { CheckUserExistByUuid } from '../validators/check-user-exist-by-uuid.validator';

export class UploadImageProfileDto {
  @ApiProperty()
  @CheckUserExistByUuid()
  reference_uuid: string;

  @ApiProperty()
  @IsDefined()
  payload: object;
}
