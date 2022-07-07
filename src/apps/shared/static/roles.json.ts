import { ListRoles } from './roles';

const ROLE_JSON = {
  Roles: [
    {
      name: 'Super_admin',
      key: ListRoles.SUPER_ADMIN,
      internal: false,
    },
    {
      name: 'Admin',
      key: ListRoles.ADMIN,
      internal: false,
    },
    {
      name: 'Dev',
      key: ListRoles.DEV,
      internal: false,
    },
    {
      name: 'Guest',
      key: ListRoles.GUEST,
      internal: false,
    },
    {
      name: 'Internal',
      key: ListRoles.INTERNAL,
      internal: false,
    },
    {
      name: 'User',
      key: ListRoles.USER,
      internal: false,
    },
  ],
};
export default ROLE_JSON;
