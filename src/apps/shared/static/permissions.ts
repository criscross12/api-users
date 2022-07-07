export enum ListPermissions {
  CREATE_USERS = 'create_users',
  GET_USERS = 'get_users',
  UPDATE_USERS = 'update_users',
  DELETE_USERS = 'delete_users',
  ASSING_PERMISSIONS_USERS = 'assing_permissions_users',
  DELETE_PERMISSIONS_USERS = 'delete_permissions_users',
  RECOVERY_PASSWORD_USERS = 'recovery_password_users',
  ASSING_ROLES_USERS = 'assing_roles_users',
  DELETE_ROLES_USERS = 'delete_roles_users',
  UPDATE_PASSWORD_USERS = 'update_password_users',

  CREATE_PERMISSIONS = 'create_permissions',
  GET_PERMISSIONS = 'get_permissions',
  GET_PERMISSIONS_BY_UUIDS = 'get_permissions_by_uuids',
  UPDATE_PERMISSIONS = 'update_permissions',
  DELETE_PERMISSIONS = 'delete_permissions',

  GET_PERMISSIONS_ACCOUNT = 'get_permissions_account',

  CREATE_ROLES = 'create_roles',
  GET_ROLES = 'get_roles',
  UPDATE_ROLES = 'update_roles',
  DELETE_ROLES = 'delete_roles',
  ASSING_PERMISSIONS_TO_ROLES = 'assing_permissions_to_roles',
  DELETE_PERMISSIONS_TO_ROLES = 'delete_permissions_to_roles',

  CREATE_ROLES_ACCOUNT = 'create_roles_account',
  GET_ROLES_ACCOUNT = 'get_roles_account',
  UPDATE_ROLES_ACCOUNT = 'update_roles_account',
  DELETE_ROLES_ACCOUNT = 'delete_roles_account',

  CREATE_USERS_ACCOUNT = 'create_users_account',
  GET_USERS_ACCOUNT = 'get_users_account',
  UPDATE_USERS_ACCOUNT = 'update_users_account',
  DELETE_USERS_ACCOUNT = 'delete_users_account',
  GET_PERMISSIONS_OF_ACCOUNT = 'get_permissions_of_account',

  CREATE_ACCOUNTS_INVITATION = 'create_account_invitation',
  GET_ACCOUNTS_INVITATION = 'get_accounts_invitation',
  DELETE_ACCOUNTS_INVITATION = 'detele_account_invitation',

  GET_USERS_INVITATION = 'get_users_invitation',
  STATUS_USERS_INVITATION = 'status_users_invitation',
}
