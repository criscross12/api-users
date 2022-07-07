import { PipeTransform, Injectable, HttpException } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Injectable()
export class UuidUserPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}
  async transform(data) {
    const user = await this.usersService.getUserByUuid(data);
    if (!user)
      throw new HttpException(
        {
          message: 'No se encontro el usuario',
          error: 'users.not_found.error',
        },
        404,
      );
    return data;
  }
}
