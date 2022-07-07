import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PermissionDocument } from '../schemas/permission.schema';
import { parseDocument } from 'src/apps/shared/utilis/helpers';
import { PermissionDto } from '../dto/permission.dto';
import { GetPermissionDto } from '../dto/get-permission.dto';
import { UpdatePermissionDto } from '../dto/update.permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(PermissionDocument.name)
    private readonly permissionModel: Model<PermissionDocument>,
  ) {}

  createPermission = async (permissionDto: PermissionDto) => {
    const p = await this.permissionModel.create({
      ...permissionDto,
      created_at: new Date(),
    });
    return p?.toJSON();
  };

  createPermissionList = async (
    data: Array<PermissionDto>,
  ): Promise<GetPermissionDto[]> => {
    data.map((item) => {
      item.created_at = new Date();
      return item;
    });
    const permission = await this.permissionModel.insertMany(data);
    return permission.map((p) => p.toJSON());
  };

  deletePermissionByApiKey = (api_key: string) =>
    this.permissionModel.deleteMany({ api_key });

  getPermissionByKey = async (key: string) => {
    const p = await this.permissionModel.findOne({ key });
    return p?.toJSON();
  };

  getPermissionByUuid = async (uuid: string) => {
    const p = await this.permissionModel.findOne({ uuid });
    return p?.toJSON();
  };

  getPermissions = async (): Promise<GetPermissionDto[]> =>
    (await this.permissionModel.find()).map((p) => p.toJSON());

  getPermissionById = async (id: string): Promise<GetPermissionDto> =>
    parseDocument(await this.permissionModel.findById(id));

  getPermissionsByIds = async (ids: string[]): Promise<GetPermissionDto[]> =>
    (await this.permissionModel.find({ _id: { $in: ids } })).map((p) =>
      parseDocument(p),
    );

  getPermissionsByKeys = async (keys: string[]): Promise<GetPermissionDto[]> =>
    (await this.permissionModel.find({ key: { $in: keys } })).map((p) =>
      p.toJSON(),
    );

  getPermissionsByUuids = async (
    uuids: string[],
  ): Promise<GetPermissionDto[]> =>
    (await this.permissionModel.find({ uuid: { $in: uuids } })).map((p) =>
      parseDocument(p),
    );

  updatePermissionByUuid = async (uuid: string, data: UpdatePermissionDto) =>
    await this.permissionModel.updateOne(
      { uuid },
      { data, updated_at: new Date() },
    );

  removePermissionByUuid = async (uuid: string) =>
    await this.permissionModel.deleteOne({ uuid }, { new: true });
}
