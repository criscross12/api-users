// import { ICreateUserAdmin } from '@notifications/notifications-sdk/interfaces/create-user-admin.interface';
import { UtilUser } from '../utils/index.util';

export const buildJsonCreateUserAdmin = async (email, password) => ({
  user_name: 'Super Admin',
  email: email,
  password: await new UtilUser().getPasswordEncript(password),
  phone: null,
  enabled: true,
  permissions: [],
  key_refresh_token: null,
  confirmation_at: new Date(),
  roles: ['super_admin'],
});
