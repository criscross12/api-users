import { Injectable } from '@nestjs/common';
import { UtilUser } from '../utils/index.util';
import { plainToClass } from 'class-transformer';
import { RolesService } from 'src/apps/roles/services/roles.service';
import { PermissionsService } from 'src/apps/permissions/services/permissions.service';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';
import { UsersService } from '../services/users.service';
import { GetUserDto } from '../dto/get-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AssignPermissionsToUserDto } from '../dto/assign-permissions-to-user.dto';
import { DeletePermissionsToUserDto } from '../dto/delete-permissions-to-user.dto';
import { AssignRolesToUserDto } from '../dto/assign-roles-to-user.dto';
import { DeleteRolesToUserDto } from '../dto/delete-roles-to-user.dto';
import { UpdatePasswordUserDto } from '../dto/update-password-user.dto';
import { GetUserDetailDto } from '../dto/get-user-detail.dto';
import { UploadImageProfileDto } from '../dto/upload-images-profile.dto';
import { GetPermissionDto } from 'src/apps/permissions/dto/get-permission.dto';
import { GetRoleDto } from 'src/apps/roles/dto/get-role.dto';
import { GetAge } from 'src/apps/shared/utilis/helpers';

@Injectable()
export class UsersServiceApp {
  constructor(
    private readonly usersService: UsersService,
    private readonly utilUser: UtilUser,
    private readonly rolesService: RolesService,
    private readonly permissionsService: PermissionsService,
  ) {}

  create = async (createUserDto: CreateUserDto): Promise<GetUserDto> => {
    return plainToClass(
      GetUserDto,
      await this.usersService.createUser(createUserDto),
    );
  };

  findAll = async (): Promise<GetUserDto[]> => {
    let users = await this.usersService.getUsers();
    return users.map((u) => {
      u.age = GetAge(u.date_of_birth);
      return u;
    });
  };

  async findOne(uuid: string) {
    const user = await this.usersService.getUserByUuid(uuid);
    user.age = GetAge(user.date_of_birth);
    if (!user) throw new UserNotFoundError();
    return plainToClass(GetUserDto, user);
  }

  async update(
    uuid: string,
    updateUserDto: UpdateUserDto,
  ): Promise<MessageResponseDto> {
    await this.usersService.updateUserByUuid(uuid, updateUserDto);
    return { message: 'updated' };
  }

  async remove(uuid: string): Promise<MessageResponseDto> {
    await this.usersService.removeUserByUuid(uuid);
    return { message: 'deleted' };
  }

  async removeAccount(uuid: string): Promise<MessageResponseDto> {
    await this.usersService.removeUserByUuid(uuid);
    return { message: 'deleted' };
  }

  async assignPermissionstoUser(
    data: AssignPermissionsToUserDto,
  ): Promise<MessageResponseDto> {
    const user = await this.usersService.getUserByUuid(data.userUuid);
    const permission = this.utilUser.mergePermisions(
      user.permissions ?? [],
      data.permissions,
    );
    await this.usersService.updatePermissionsByUserId(user._id, permission);
    return { message: 'updated' };
  }

  async deletePermissionstoUser(
    data: DeletePermissionsToUserDto,
  ): Promise<MessageResponseDto> {
    const user = await this.usersService.getUserByUuid(data.userUuid);
    const permission = this.utilUser.removePermissions(
      user.permissions ?? [],
      data.permissions,
    );
    await this.usersService.updatePermissionsByUserId(user._id, permission);
    return { message: 'updated' };
  }

  async changePassword(
    uuid: string,
    password: string,
  ): Promise<MessageResponseDto> {
    await this.usersService.updatePasswordUserByUuid(uuid, password);
    return { message: 'updated' };
  }

  async assignRolestoUser(
    data: AssignRolesToUserDto,
  ): Promise<MessageResponseDto> {
    const user = await this.usersService.getUserByUuid(data.userUuid);
    const roles = this.utilUser.mergeRoles(user.roles ?? [], data.roles);
    await this.usersService.updateRolesByUserId(user._id, roles);
    return { message: 'updated' };
  }

  async deleteRolestoUser(
    data: DeleteRolesToUserDto,
  ): Promise<MessageResponseDto> {
    const user = await this.usersService.getUserByUuid(data.userUuid);
    const roles = this.utilUser.removeRoles(user.roles ?? [], data.roles);
    await this.usersService.updateRolesByUserId(user._id, roles);
    return { message: 'updated' };
  }

  async updatePassword(
    uuid: string,
    data: UpdatePasswordUserDto,
  ): Promise<MessageResponseDto> {
    await this.usersService.updatePasswordUserByUuid(uuid, data.password);
    return { message: 'updated' };
  }

  async getUserByUuid(uuid: string): Promise<GetUserDetailDto> {
    const user = await this.usersService.getUserByUuid(uuid);
    if (!user) throw new UserNotFoundError();
    let roles = await this.rolesService.getRoleByKeys(user.roles);
    let permissionsKeys = user.permissions ?? [];

    roles.forEach((role) => {
      permissionsKeys = [...permissionsKeys, ...(role.permissions ?? [])];
    });
    roles = roles.map((role) => plainToClass(GetRoleDto, role));
    user.ListRoles = roles;
    let permissions = await this.permissionsService.getPermissionsByKeys([
      ...new Set(permissionsKeys),
    ]);
    permissions = permissions.map((permission) =>
      plainToClass(GetPermissionDto, permission),
    );
    user.listPermissions = permissions;

    return plainToClass(GetUserDetailDto, user);
  }

  uploadImage = async (uploadImageProfileDto: UploadImageProfileDto) => {
    await this.usersService.updateImageProfile(
      uploadImageProfileDto.reference_uuid,
      uploadImageProfileDto.payload,
    );
    return { message: 'upload' };
  };
}
