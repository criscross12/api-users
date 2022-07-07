import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { convertToJson } from 'src/apps/shared/helpers';
import { parseDocument } from 'src/apps/shared/utilis/helpers';
import { CreateRoleAccountDto } from '../dto/create-role-account.dto';
import { CreateRoleDto } from '../dto/create-role.dto';
import { GetRoleAccountDto } from '../dto/get-role-account.dto';
import { GetRoleDto } from '../dto/get-role.dto';
import { UpdateRoleAccountDto } from '../dto/update-role-account.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleDocument } from '../schemas/role.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(RoleDocument.name)
    private readonly roleModel: Model<RoleDocument>,
  ) {}

  createRole = async (createRoleDto: CreateRoleDto): Promise<GetRoleDto> =>
    parseDocument(
      await this.roleModel.create({ ...createRoleDto, created_at: new Date() }),
    );

  getRoles = async (): Promise<GetRoleDto[]> => {
    const roles = await this.roleModel.find();
    return roles.map((u) => parseDocument(u));
  };

  getRoleByUuid = async (uuid: string): Promise<GetRoleDto> =>
    parseDocument(await this.roleModel.findOne({ uuid }));

  getRolesByUuids = async (uuids: string[]): Promise<GetRoleDto[]> =>
    (await this.roleModel.find({ uuid: { $in: uuids } })).map((role) =>
      parseDocument(role),
    );

  getRolesByIds = async (ids: string[]): Promise<GetRoleDto[]> =>
    (await this.roleModel.find({ _id: { $in: ids } })).map((role) =>
      parseDocument(role),
    );

  getRoleByNameKey = async (key: string): Promise<GetRoleDto> =>
    convertToJson(await this.roleModel.findOne({ key }));

  getRoleByKeys = async (keys: string[]): Promise<GetRoleDto[]> =>
    (await this.roleModel.find({ key: { $in: keys } })).map((r) =>
      convertToJson(r),
    );

  getRoleByKeysAndAccount = async (
    keys: string[],
    account_uuid: string,
  ): Promise<GetRoleDto[]> =>
    (await this.roleModel.find({ key: { $in: keys }, account_uuid })).map((r) =>
      convertToJson(r),
    );

  updateRoleByUuid = (uuid: string, data: UpdateRoleDto) =>
    this.roleModel.updateOne({ uuid }, { ...data, updated_at: new Date() });

  removeRoleByUuid = (uuid: string) =>
    this.roleModel.deleteOne({ uuid }, { new: true });

  destroyRole = () => this.roleModel.deleteMany({}, { new: true });

  updatePermissionsByRoleId = async (id: string, permissions: Array<string>) =>
    convertToJson(await this.roleModel.findByIdAndUpdate(id, { permissions }));

  createRoleAccount = async (
    createRoleAccountDto: CreateRoleAccountDto,
  ): Promise<GetRoleAccountDto> =>
    parseDocument(
      await this.roleModel.create({
        ...createRoleAccountDto,
        created_at: new Date(),
      }),
    );

  getRolesAccount = async (
    account_uuid: string,
  ): Promise<GetRoleAccountDto[]> => {
    const roles = await this.roleModel.find({ account_uuid });
    return roles.map((u) => parseDocument(u));
  };

  getRoleAccountByUuid = async (
    uuid: string,
    account_uuid: string,
  ): Promise<GetRoleAccountDto> =>
    parseDocument(await this.roleModel.findOne({ uuid, account_uuid }));

  updateRoleAccountByUuid = (
    uuid: string,
    data: UpdateRoleAccountDto,
    account_uuid: string,
  ) =>
    this.roleModel.updateOne(
      { uuid, account_uuid },
      { ...data, updated_at: new Date() },
    );

  removeRoleAccountByUuid = (uuid: string, account_uuid: string) =>
    this.roleModel.deleteOne({ uuid, account_uuid }, { new: true });

  createDefaultRoles = async (
    rolesValues: Array<string>,
    account_uuid: string,
  ) => {
    let roles = {};
    for (const data of rolesValues) {
      roles = {
        name: data,
        account_uuid,
        created_at: new Date(),
        updated_at: new Date(),
      };
      await this.roleModel.insertMany(roles);
    }
  };
}
