import {
  USER_PASSWORD_MINIMUM_LENGTH,
  USER_LIST_BOOLEAN_VALUES,
} from '../constants';
import { UserMessagesType } from '../types/user-messages.type';
import { UserMessagesEnum } from '../enums/user-error-keys.enum';
import { RecoveryPasswordMethodsEnum } from '../enums/recovery-password-method.enum';
import { CustomMessage } from '../../shared/errors/custom.error';
import { CustomConfigModule } from '../../../config/custom-config.module';
new CustomConfigModule();

export const USER_MESSAGES: UserMessagesType = {
  [UserMessagesEnum.NOT_FOUND]: new CustomMessage({
    message: 'No se encontro el usuario',
    error: UserMessagesEnum.NOT_FOUND,
  }),
  [UserMessagesEnum.CREATE_USER_ERROR]: new CustomMessage({
    message: 'Error al crear el usuario',
    error: UserMessagesEnum.CREATE_USER_ERROR,
  }),
  [UserMessagesEnum.ALREADY_EXIST]: new CustomMessage({
    message: 'El usuario ya existe',
    error: UserMessagesEnum.ALREADY_EXIST,
  }),
  [UserMessagesEnum.EMAIL_INVALID]: new CustomMessage({
    message: 'El email es incorrecto',
    error: UserMessagesEnum.EMAIL_INVALID,
  }),
  [UserMessagesEnum.PASSWORD_INVALID]: new CustomMessage({
    message: 'La contraseña es invalida',
    error: UserMessagesEnum.PASSWORD_INVALID,
  }),
  [UserMessagesEnum.PASSWORD_INVALID_LENGHT]: new CustomMessage({
    message: `La contraseña debe tener minimo ${USER_PASSWORD_MINIMUM_LENGTH} caracteres`,
    error: UserMessagesEnum.PASSWORD_INVALID_LENGHT,
    data: { min_length: USER_PASSWORD_MINIMUM_LENGTH },
  }),
  [UserMessagesEnum.IMAGE_PROFILE_INVALID]: new CustomMessage({
    message: 'Url de la imagen invalida',
    error: UserMessagesEnum.IMAGE_PROFILE_INVALID,
  }),
  [UserMessagesEnum.USER_NAME_INVALID]: new CustomMessage({
    message: 'Nombre de usuario invalido ',
    error: UserMessagesEnum.USER_NAME_INVALID,
  }),
  [UserMessagesEnum.PHONE_INVALID]: new CustomMessage({
    message: 'Telefono invalido',
    error: UserMessagesEnum.PHONE_INVALID,
  }),
  [UserMessagesEnum.ENABLED_INVALID]: new CustomMessage({
    message: 'El valor de Habilitar y desabilitar es invalido',
    error: UserMessagesEnum.ENABLED_INVALID,
    data: { valuesAllow: USER_LIST_BOOLEAN_VALUES },
  }),
  [UserMessagesEnum.KEY_REFRESH_TOKEN_INVALID]: new CustomMessage({
    message: 'El valor de Habilitar y desabilitar es invalido',
    error: UserMessagesEnum.ENABLED_INVALID,
    data: { valuesAllow: UserMessagesEnum.KEY_REFRESH_TOKEN_INVALID },
  }),
  [UserMessagesEnum.INTERNAL_INVALID]: new CustomMessage({
    message: 'El valor del adminitrative es invalido ',
    error: UserMessagesEnum.INTERNAL_INVALID,
    data: { valuesAllow: USER_LIST_BOOLEAN_VALUES },
  }),
  [UserMessagesEnum.PERMISSIONS_UUIDS_ARE_INVALID]: new CustomMessage({
    message: 'Ingresa un Array de uuids de permisos',
    error: UserMessagesEnum.PERMISSIONS_UUIDS_ARE_INVALID,
  }),
  [UserMessagesEnum.ROLES_UUIDS_ARE_INVALID]: new CustomMessage({
    message: 'Ingresa un Array de uuids de roles',
    error: UserMessagesEnum.ROLES_UUIDS_ARE_INVALID,
  }),
  [UserMessagesEnum.USER_UUID_IS_INVALID]: new CustomMessage({
    message: 'El uuid del usuario no existe ',
    error: UserMessagesEnum.USER_UUID_IS_INVALID,
  }),
  [UserMessagesEnum.USER_PHONE_IS_INVALID]: new CustomMessage({
    message: 'El telefono ya esta vinculado con una cuenta ',
    error: UserMessagesEnum.USER_PHONE_IS_INVALID,
  }),
  [UserMessagesEnum.RECOVERY_PASSWORD_CODE_INVALID]: new CustomMessage({
    message: 'El codigo de recuperacion de contraseña es invalido',
    error: UserMessagesEnum.RECOVERY_PASSWORD_CODE_INVALID,
  }),
  [UserMessagesEnum.RECOVERY_PASSWORD_METHOD_INVALID]: new CustomMessage({
    message: 'El codigo de recuperacion de contraseña es invalido',
    error: UserMessagesEnum.RECOVERY_PASSWORD_METHOD_INVALID,
    data: [
      {
        recovery_password_methods_allow: Object.keys(
          RecoveryPasswordMethodsEnum,
        ).map((key) => RecoveryPasswordMethodsEnum[key]),
      },
    ],
  }),
  [UserMessagesEnum.RECOVERY_PASSWORD_CODE_EXPIRED]: new CustomMessage({
    message: 'El codigo de recuperacion de contraseña expiro',
    error: UserMessagesEnum.RECOVERY_PASSWORD_CODE_EXPIRED,
  }),
  [UserMessagesEnum.RECOVERY_PASSWORD_TOKEN_INVALID]: new CustomMessage({
    message: 'El token de recuperacion de contraseña es invalido',
    error: UserMessagesEnum.RECOVERY_PASSWORD_TOKEN_INVALID,
  }),
  [UserMessagesEnum.RECOVERY_PASSWORD_TOKEN_EXPIRED]: new CustomMessage({
    message: 'El token de recuperacion de contraseña expiro',
    error: UserMessagesEnum.RECOVERY_PASSWORD_TOKEN_EXPIRED,
  }),
  [UserMessagesEnum.RECOVERY_PASSWORD_NOT_AVAILABLE]: new CustomMessage({
    message: 'Servicio de recuperacion de contraseña no disponible',
    error: UserMessagesEnum.RECOVERY_PASSWORD_NOT_AVAILABLE,
  }),
  [UserMessagesEnum.REGISTER_ME_NOT_AVAILABLE]: new CustomMessage({
    message: 'Servicio de registro no disponible',
    error: UserMessagesEnum.REGISTER_ME_NOT_AVAILABLE,
  }),

  [UserMessagesEnum.OBJECT_IS_INVALID]: new CustomMessage({
    message: 'Objeto invalido',
    error: UserMessagesEnum.OBJECT_IS_INVALID,
  }),
  [UserMessagesEnum.DEVICE_UUID_INVALID]: new CustomMessage({
    message: 'uuid del dispositivo es invalido',
    error: UserMessagesEnum.DEVICE_UUID_INVALID,
  }),
  [UserMessagesEnum.DEVICE_TOKEN_INVALID]: new CustomMessage({
    message: 'token del dispositivo es invalido',
    error: UserMessagesEnum.DEVICE_TOKEN_INVALID,
  }),

  [UserMessagesEnum.PERMISSIONS_INVALID]: new CustomMessage({
    message: 'Ingresa un Array de permisos',
    error: UserMessagesEnum.PERMISSIONS_INVALID,
  }),
  [UserMessagesEnum.ROLES_INVALID]: new CustomMessage({
    message: 'Ingresa un Array de roles',
    error: UserMessagesEnum.ROLES_INVALID,
  }),

  [UserMessagesEnum.ACTIVE_INVALID]: new CustomMessage({
    message: 'Activo invalido',
    error: UserMessagesEnum.ACTIVE_INVALID,
  }),
};
