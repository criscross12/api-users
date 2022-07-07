import { PipeTransform, Injectable } from '@nestjs/common';
import { UtilUser } from '../utils/index.util';

@Injectable()
export class EncriptPasswordPipe implements PipeTransform {
  constructor(private readonly utils: UtilUser) {}
  async transform(data) {
    data.password = await this.utils.getPasswordEncript(data.password);
    return data;
  }
}
