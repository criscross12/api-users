import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { parseDocument } from 'src/apps/shared/utilis/helpers';
import { IUpdateRowCollectionResponse } from 'src/apps/shared/interfaces/update-row-collection-response.interface';
import { UserDocument } from '../schemas/user.schema';
import { GetUserDto } from '../dto/get-user.dto';
import { GetUserLoginDto } from '../dto/get-user-login.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateMeDto } from '../dto/update-me.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  getUserByEmail = async (email: string): Promise<GetUserDto> =>
    parseDocument(await this.userModel.findOne({ email }));

  getUserByPhone = async (phone: string): Promise<GetUserDto> =>
    parseDocument(await this.userModel.findOne({ phone }));

  getUserByPhoneAndKeyPhone = async (
    phone: string,
    key_phone: string,
  ): Promise<GetUserDto> =>
    parseDocument(await this.userModel.findOne({ phone, key_phone }));

  getUserByUuid = async (uuid: string): Promise<GetUserDto> =>
    parseDocument(await this.userModel.findOne({ uuid }));

  getUserLogin = async (userEmailPhone: string): Promise<GetUserLoginDto> =>
    parseDocument(
      await this.userModel.findOne({
        $or: [
          {
            email: userEmailPhone,
          },
          {
            phone: userEmailPhone,
          },
        ],
        deleted_at: null,
      }),
    );

  getUserById = async (id: string): Promise<GetUserDto> =>
    parseDocument(await this.userModel.findById(id));

  getUsersByUuids = async (uuids: string[]): Promise<GetUserDto[]> =>
    (await this.userModel.find({ uuid: { $in: uuids } })).map((p) =>
      parseDocument(p),
    );

  createUser = async (createUserDto: CreateUserDto): Promise<GetUserDto> =>
    plainToInstance(
      GetUserDto,
      parseDocument(
        await new this.userModel({
          ...createUserDto,
          created_at: new Date(),
        }).save(),
      ),
    );

  getUsers = async (): Promise<GetUserDto[]> => {
    const users = await this.userModel.find({ deleted_at: null, roles: "patient" });
    return users.map((u) => parseDocument(u));
  };

  confirmateUser = async (
    uuid: string,
  ): Promise<IUpdateRowCollectionResponse> =>
    await this.userModel.updateOne(
      { uuid },
      { confirmation_at: Date.now() },
      { new: true },
    );

  confirmateUserByEmail = async (
    uuid: string,
  ): Promise<IUpdateRowCollectionResponse> =>
    await this.userModel.updateOne(
      { uuid },
      { confirmation_at: Date.now(), confirmation_email_at: Date.now() },
      { new: true },
    );

  confirmateUserByPhone = async (
    uuid: string,
  ): Promise<IUpdateRowCollectionResponse> =>
    await this.userModel.updateOne(
      { uuid },
      { confirmation_at: Date.now(), confirmation_phone_at: Date.now() },
      { new: true },
    );

  updatePasswordUserById = (id: string, password: string) =>
    this.userModel.findByIdAndUpdate(id, { password, updated_at: new Date() });

  updatePasswordUserByUuid = (uuid: string, password: string) =>
    this.userModel.updateOne({ uuid }, { password, updated_at: new Date() });

  updateUserById = (id: string, updateUserDto: UpdateUserDto) =>
    this.userModel.findByIdAndUpdate(id, {
      updateUserDto,
      updated_at: new Date(),
    });

  updatePermissionsByUserId = (id: string, permissions: Array<string>) =>
    this.userModel.findByIdAndUpdate(id, {
      permissions,
      updated_at: new Date(),
    });

  updateRolesByUserId = (id: string, roles: Array<string>) =>
    this.userModel.findByIdAndUpdate(id, { roles, updated_at: new Date() });

  updateUserByUuid = (uuid: string, updateUserDto: UpdateUserDto) =>
    this.userModel.updateOne(
      { uuid },
      { updateUserDto, updated_at: new Date() },
    );

  updateMeByUuid = (uuid: string, updateMeDto: UpdateMeDto) =>
    this.userModel.updateOne({ uuid }, { updateMeDto, updated_at: new Date() });

  updateImageProfile = (uuid: string, image_profile: object) =>
    this.userModel.updateOne(
      { uuid },
      { image_profile, updated_at: new Date() },
    );

  destroyUserByUuid = (uuid: string) =>
    this.userModel.deleteOne({ uuid }, { new: true });

  setAccountToUserByUuid = (uuid: string, account_uuid: string) =>
    this.userModel.updateOne(
      { uuid },
      { account_uuid, updated_at: new Date() },
      { new: true },
    );

  removeUserByUuid = async (uuid: string) => {
    await this.userModel.updateOne(
      { uuid },
      { enabled: false, deleted_at: Date.now() },
      { new: true },
    );
  };
}
