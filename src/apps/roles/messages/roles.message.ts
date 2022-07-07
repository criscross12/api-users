import { ROLE_LIST_BOOLEAN_VALUES } from '../constants';
import { CustomMessage } from '../../shared/errors/custom.error';
import { CustomConfigModule } from '../../../config/custom-config.module';
import { RoleMessagesEnum } from '../emuns/role-messages.enum';
import { RoleMessagesType } from '../types/role-messages.type';

new CustomConfigModule();

export const ROLES_MESSAGES: RoleMessagesType = {
  [RoleMessagesEnum.NOT_FOUND]: new CustomMessage({
    message: 'No se encontro el rol',
    error: RoleMessagesEnum.NOT_FOUND,
  }),
  [RoleMessagesEnum.ROLE_NAME_INVALID]: new CustomMessage({
    message: 'Nombre de rol invalido ',
    error: RoleMessagesEnum.ROLE_NAME_INVALID,
  }),
  [RoleMessagesEnum.ROLE_UUID_IS_INVALID]: new CustomMessage({
    message: 'El uuid del rol no existe',
    error: RoleMessagesEnum.ROLE_UUID_IS_INVALID,
  }),
  [RoleMessagesEnum.ALREADY_EXIST]: new CustomMessage({
    message: 'El rol ya existe',
    error: RoleMessagesEnum.ALREADY_EXIST,
  }),
  [RoleMessagesEnum.ROLE_INVALID]: new CustomMessage({
    message: 'rol invalido',
    error: RoleMessagesEnum.ROLE_INVALID,
  }),
  [RoleMessagesEnum.key_INVALID]: new CustomMessage({
    message: 'nombre clave invalido',
    error: RoleMessagesEnum.key_INVALID,
  }),

  [RoleMessagesEnum.ENABLED_INVALID]: new CustomMessage({
    message: 'El valor de Habilitar y desabilitar es invalido',
    error: RoleMessagesEnum.ENABLED_INVALID,
    data: {
      keys_status: ROLE_LIST_BOOLEAN_VALUES,
    },
  }),

  [RoleMessagesEnum.PERMISSIONS_UUIDS_ARE_INVALID]: new CustomMessage({
    message: 'Ingresa un Array de uuids de permisos',
    error: RoleMessagesEnum.PERMISSIONS_UUIDS_ARE_INVALID,
  }),

  [RoleMessagesEnum.PERMISSION_KEY_INVALID]: new CustomMessage({
    message: 'Ingresa un key de permiso correcto',
    error: RoleMessagesEnum.PERMISSION_KEY_INVALID,
  }),

  [RoleMessagesEnum.PERMISSIONS_NAME_INVALID]: new CustomMessage({
    message: 'Ingresa Array de permisos correcto',
    error: RoleMessagesEnum.PERMISSIONS_NAME_INVALID,
  }),

  [RoleMessagesEnum.ACCOUNT_UUID_INVALID]: new CustomMessage({
    message: 'El uuid de la cuenta es invalida',
    error: RoleMessagesEnum.ACCOUNT_UUID_INVALID,
  }),
};
