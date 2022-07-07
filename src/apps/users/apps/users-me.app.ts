import { Injectable } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { RolesService } from 'src/apps/roles/services/roles.service';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';
import { mergeArrays } from 'src/apps/shared/helpers';
import { UsersService } from '../services/users.service';
import { GetUserDto } from '../dto/get-user.dto';
import { RegisterMeDto } from '../dto/register-me.dto';
import { UpdateMeDto } from '../dto/update-me.dto';
import { GetProfileUserDto } from '../dto/get-user-profile.dto';
import { configLoader } from 'src/config/configs/env.configs';
// import { NotificationsService } from '@notifications/notifications-sdk';
import { UsersErrorsHandle } from '../errors-handlers/users-errors.handler';
// import { buildJsonCreateNotification } from '../builders/user-notification.build';

@Injectable()
export class UsersMeApp {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    // private readonly notificationsService: NotificationsService,
    private readonly usersErrorsHandle: UsersErrorsHandle,
  ) {}

  // registerme = async (registerMeDto: RegisterMeDto): Promise<GetUserDto> => {
  //   const { account_confirmation_available } = configLoader().flats;

  //   const user = plainToInstance(
  //     GetUserDto,
  //     await this.usersService.createUser(registerMeDto),
  //   );

  //   // if (user_have_account_available && create_account_inside_user_available) {
  //   //   // const dataCreateAccount = buildJsonCreateAccount(user);
  //   //   const account = await this.accountsService.createAccount(
  //   //     dataCreateAccount,
  //   //     (err) => this.usersErrorsHandle.createAccount(err, user),
  //   //   );
  //   //   user.account_uuid = account.uuid;
  //   // await this.usersService.setAccountToUserByUuid(user.uuid, account.uuid);
  //   //   await this.usersAccountsRepository.createUserAccount({
  //   //     user_uuid: user.uuid,
  //   //     account_uuid: account.uuid,
  //   //     active: true,
  //   //     permissions: [],
  //   //     roles: ['super_admin'],
  //   //   });
  //   // }

  //   if (account_confirmation_available) {
  //     const dataCreateNotification = buildJsonCreateNotification(user);
  //     this.notificationsService.createConfigNotification(
  //       dataCreateNotification,
  //       (err) => this.usersErrorsHandle.createNotification(err, user),
  //     );
  //   }

  //   return user;
  // };

  async updateMe(
    uuid: string,
    updateMeDto: UpdateMeDto,
  ): Promise<MessageResponseDto> {
    await this.usersService.updateMeByUuid(uuid, updateMeDto);
    return { message: 'updated' };
  }

  getProfileUserByUuid = async (uuid: string): Promise<GetProfileUserDto> => {
    const profile = plainToClass(
      GetProfileUserDto,
      await this.usersService.getUserByUuid(uuid),
    );
    const listRoles = await this.rolesService.getRoleByKeys(profile.roles);
    let permissions = profile.permissions ?? [];
    listRoles.map((r) => {
      permissions = mergeArrays(permissions, r.permissions);
    });
    profile.permissions = permissions;
    return profile;
  };
}
