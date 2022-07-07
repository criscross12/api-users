import { PipeTransform, Injectable } from '@nestjs/common';
import {
  USER_ENABLED_VALUE_DEFAULT,
  USER_INTERNAL_VALUE_DEFAULT,
  USER_LANGUAGE_VALUE_DEFAULT,
  USER_PERMISSION_VALUE_DEFAULT,
} from '../constants';
import { RegisterMeDto } from '../dto/register-me.dto';
import { UtilUser } from '../utils/index.util';

@Injectable()
export class RegisterMePipe implements PipeTransform {
  constructor(private readonly utils: UtilUser) {}
  transform(data: RegisterMeDto) {
    if (!data.user_name) {
      data.user_name = data.email
        ? this.utils.getNameOfEmail(data.email)
        : data.phone;
    }
    if (!data.language) data.language = USER_LANGUAGE_VALUE_DEFAULT;
    data.enabled = USER_ENABLED_VALUE_DEFAULT;
    data.internal = USER_INTERNAL_VALUE_DEFAULT;
    data.roles = [USER_PERMISSION_VALUE_DEFAULT];
    return data;
  }
}
