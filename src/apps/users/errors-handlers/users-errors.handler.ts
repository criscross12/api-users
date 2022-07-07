import { Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { GetUserDto } from '../dto/get-user.dto';
import { UserMessagesEnum } from '../enums/user-error-keys.enum';
import { AxiosResponse } from 'axios';

@Injectable()
export class UsersErrorsHandle {
  constructor(private readonly usersService: UsersService) {}

  createAccount = async (
    err: AxiosResponse,
    user: GetUserDto,
  ): Promise<any> => {
    err = err['response'].data;
    await this.usersService.destroyUserByUuid(user.uuid);
    throw new Error(UserMessagesEnum.CREATE_USER_ERROR);
  };

  createNotification = async (
    err: AxiosResponse,
    userWithAccount: GetUserDto,
  ): Promise<any> => {
    err = err['response'].data;
    await this.usersService.destroyUserByUuid(userWithAccount.uuid);
    throw new Error(UserMessagesEnum.CREATE_USER_ERROR);
  };
}
