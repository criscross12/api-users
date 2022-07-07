import { CustomMessage } from '../../shared/errors/custom.error';
import { CustomConfigModule } from '../../../config/custom-config.module';
import { PermissionMessagesEnum } from '../emuns/permission.enum';
import { PermissionMessagesType } from '../types/permission-messages.type';

new CustomConfigModule();

export const PERMISSIONS_MESSAGES: PermissionMessagesType = {
  [PermissionMessagesEnum.NOT_FOUND]: new CustomMessage({
    message: 'No se encontro el permiso',
    error: PermissionMessagesEnum.NOT_FOUND,
  }),
  [PermissionMessagesEnum.PERMISSION_NAME_INVALID]: new CustomMessage({
    message: 'Nombre de permiso invalido ',
    error: PermissionMessagesEnum.PERMISSION_NAME_INVALID,
  }),
  [PermissionMessagesEnum.key_INVALID]: new CustomMessage({
    message: 'Nombre clave invalido',
    error: PermissionMessagesEnum.key_INVALID,
  }),
  [PermissionMessagesEnum.API_KEY_INVALID]: new CustomMessage({
    message: 'Nombre clave invalido',
    error: PermissionMessagesEnum.API_KEY_INVALID,
  }),
  [PermissionMessagesEnum.GROUP_KEY_INVALID]: new CustomMessage({
    message: 'Nombre clave del grupo invalido',
    error: PermissionMessagesEnum.GROUP_KEY_INVALID,
  }),
  [PermissionMessagesEnum.PERMISSION_UUID_IS_INVALID]: new CustomMessage({
    message: 'El uuid del permiso no existe',
    error: PermissionMessagesEnum.PERMISSION_UUID_IS_INVALID,
  }),

  [PermissionMessagesEnum.ALREADY_EXIST]: new CustomMessage({
    message: 'el permiso ya existe',
    error: PermissionMessagesEnum.ALREADY_EXIST,
  }),

  [PermissionMessagesEnum.PERMISSIONS_INVALID]: new CustomMessage({
    message: 'permiso invalido',
    error: PermissionMessagesEnum.PERMISSIONS_INVALID,
  }),

  [PermissionMessagesEnum.API_KEYS_REPEAT]: new CustomMessage({
    message: 'no deben haber api keys repetidos',
    error: PermissionMessagesEnum.API_KEYS_REPEAT,
  }),

  [PermissionMessagesEnum.NAME_KEYS_REPEAT]: new CustomMessage({
    message: 'no deben haber name keys repetidos',
    error: PermissionMessagesEnum.NAME_KEYS_REPEAT,
  }),

  [PermissionMessagesEnum.GROUP_NAME_INVALID]: new CustomMessage({
    message: 'El nombre de grupo es invalido',
    error: PermissionMessagesEnum.GROUP_NAME_INVALID,
  }),

  [PermissionMessagesEnum.INTERNAL_INVALID]: new CustomMessage({
    message: 'Internal invalido',
    error: PermissionMessagesEnum.INTERNAL_INVALID,
  }),
};
