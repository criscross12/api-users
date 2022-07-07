import { ListPermissions } from './permissions';

const PERMISSION_JSON = {
  permissions: [
    {
      name: 'Crear usuarios',
      key: ListPermissions.CREATE_USERS,
      group_key: 'users',
      group_name: 'usuarios',
      internal: false,
    },
    {
      name: 'Ver usuarios',
      key: ListPermissions.GET_USERS,
      group_key: 'users',
      group_name: 'usuarios',
      internal: false,
    },
    {
      name: 'Actualizar usuarios',
      key: ListPermissions.UPDATE_USERS,
      group_key: 'users',
      group_name: 'usuarios',
      internal: false,
    },
    {
      name: 'Eliminar usuarios',
      key: ListPermissions.DELETE_USERS,
      group_key: 'users',
      group_name: 'usuarios',
      internal: false,
    },
    {
      name: 'Asignar permisos a usuarios',
      key: ListPermissions.ASSING_PERMISSIONS_USERS,
      group_key: 'users',
      group_name: 'usuarios',
      internal: false,
    },
    {
      name: 'Eliminar permisos a usuarios',
      key: ListPermissions.DELETE_PERMISSIONS_USERS,
      group_key: 'users',
      group_name: 'usuarios',
      internal: false,
    },
    {
      name: 'Recuperar contraseña',
      key: ListPermissions.RECOVERY_PASSWORD_USERS,
      group_key: 'users',
      group_name: 'usuarios',
      internal: false,
    },
    {
      name: 'Asignar roles a usuarios',
      key: ListPermissions.ASSING_ROLES_USERS,
      group_key: 'users',
      group_name: 'usuarios',
      internal: false,
    },
    {
      name: 'Eliminar roles a usuarios',
      key: ListPermissions.DELETE_ROLES_USERS,
      group_key: 'users',
      group_name: 'usuarios',
      internal: false,
    },
    {
      name: 'Actualizar contraseña de usuario',
      key: ListPermissions.UPDATE_PASSWORD_USERS,
      group_key: 'users',
      group_name: 'usuarios',
      internal: false,
    },

    {
      name: 'Crear permisos ',
      key: ListPermissions.CREATE_PERMISSIONS,
      group_key: 'permissions',
      group_name: 'permisos',
      internal: false,
    },
    {
      name: 'Ver permisos',
      key: ListPermissions.GET_PERMISSIONS,
      group_key: 'permissions',
      group_name: 'permisos',
      internal: false,
    },

    {
      name: 'Ver permisos por uuids',
      key: ListPermissions.GET_PERMISSIONS_BY_UUIDS,
      group_key: 'permissions',
      group_name: 'permisos',
      internal: false,
    },

    {
      name: 'Actualizar permiso',
      key: ListPermissions.UPDATE_PERMISSIONS,
      group_key: 'permissions',
      group_name: 'permisos',
      internal: false,
    },
    {
      name: 'Eliminar permiso',
      key: ListPermissions.DELETE_PERMISSIONS,
      group_key: 'permissions',
      group_name: 'permisos',
      internal: false,
    },

    {
      name: 'Ver permisos de cuenta',
      key: ListPermissions.GET_PERMISSIONS_ACCOUNT,
      group_key: 'permissions_account',
      group_name: 'permisos de cuenta',
      internal: false,
    },

    {
      name: 'Crear roles ',
      key: ListPermissions.CREATE_ROLES,
      group_key: 'roles',
      group_name: 'roles',
      internal: false,
    },
    {
      name: 'Ver roles',
      key: ListPermissions.GET_ROLES,
      group_key: 'roles',
      group_name: 'roles',
      internal: false,
    },

    {
      name: 'Actualizar role',
      key: ListPermissions.UPDATE_ROLES,
      group_key: 'roles',
      group_name: 'roles',
      internal: false,
    },
    {
      name: 'Eliminar role',
      key: ListPermissions.DELETE_ROLES,
      group_key: 'roles',
      group_name: 'roles',
      internal: false,
    },

    {
      name: 'asignar permisos a los roles',
      key: ListPermissions.ASSING_PERMISSIONS_TO_ROLES,
      group_key: 'roles',
      group_name: 'roles',
      internal: false,
    },

    {
      name: 'eliminar permisos a los roles',
      key: ListPermissions.DELETE_PERMISSIONS_TO_ROLES,
      group_key: 'roles',
      group_name: 'roles',
      internal: false,
    },

    {
      name: 'Crear roles de cuenta ',
      key: ListPermissions.CREATE_ROLES_ACCOUNT,
      group_key: 'roles_accounts',
      group_name: 'roles de cuentas',
      internal: false,
    },
    {
      name: 'Ver roles de cuenta',
      key: ListPermissions.GET_ROLES_ACCOUNT,
      group_key: 'roles_accounts',
      group_name: 'roles de cuentas',
      internal: false,
    },

    {
      name: 'Actualizar role de cuenta',
      key: ListPermissions.UPDATE_ROLES_ACCOUNT,
      group_key: 'roles_accounts',
      group_name: 'roles de cuentas',
      internal: false,
    },
    {
      name: 'Eliminar role de cuenta',
      key: ListPermissions.DELETE_ROLES_ACCOUNT,
      group_key: 'roles_accounts',
      group_name: 'roles de cuentas',
      internal: false,
    },

    {
      name: 'Crear usuarios de cuenta ',
      key: ListPermissions.CREATE_USERS_ACCOUNT,
      group_key: 'users_accounts',
      group_name: 'usuarios de cuentas',
      internal: false,
    },
    {
      name: 'Ver usuarios de cuenta',
      key: ListPermissions.GET_USERS_ACCOUNT,
      group_key: 'users_accounts',
      group_name: 'usuarios de cuentas',
      internal: false,
    },

    {
      name: 'Actualizar usuario de cuenta',
      key: ListPermissions.UPDATE_USERS_ACCOUNT,
      group_key: 'users_accounts',
      group_name: 'usuarios de cuentas',
      internal: false,
    },
    {
      name: 'Eliminar usuario de cuenta',
      key: ListPermissions.DELETE_USERS_ACCOUNT,
      group_key: 'users_accounts',
      group_name: 'usuarios de cuentas',
      internal: false,
    },

    {
      name: 'obtener permisos de cuenta',
      key: ListPermissions.GET_PERMISSIONS_OF_ACCOUNT,
      group_key: 'users_accounts',
      group_name: 'usuarios de cuentas',
      internal: false,
    },

    {
      name: 'Crear invitacion de cuenta ',
      key: ListPermissions.CREATE_ACCOUNTS_INVITATION,
      group_key: 'accounts_invitations',
      group_name: 'invitaciones de cuentas',
      internal: false,
    },

    {
      name: 'Obtener invitacion de cuenta ',
      key: ListPermissions.GET_ACCOUNTS_INVITATION,
      group_key: 'accounts_invitations',
      group_name: 'invitaciones de cuentas',
      internal: false,
    },

    {
      name: 'Eliminar invitacion de cuenta ',
      key: ListPermissions.DELETE_ACCOUNTS_INVITATION,
      group_key: 'accounts_invitations',
      group_name: 'invitaciones de cuentas',
      internal: false,
    },

    {
      name: 'Obtener invitaciones de usuarios ',
      key: ListPermissions.GET_USERS_INVITATION,
      group_key: 'users_invitations',
      group_name: 'invitaciones de usuarios',
      internal: false,
    },

    {
      name: 'Crear invitacion de usuario ',
      key: ListPermissions.STATUS_USERS_INVITATION,
      group_key: 'users_invitations',
      group_name: 'invitaciones de usuarios',
      internal: false,
    },
  ],
};
export default PERMISSION_JSON;
