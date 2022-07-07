import { AUTH_MESSAGES } from 'src/apps/auth/messages/auth.message';
import { USER_MESSAGES } from '../../../apps/users/messages/users.message';
import { PERMISSIONS_MESSAGES } from 'src/apps/permissions/messages/permissions.message';
import { ROLES_MESSAGES } from 'src/apps/roles/messages/roles.message';

export const HTTP_APP_ERROR = {
  ...USER_MESSAGES,
  ...PERMISSIONS_MESSAGES,
  ...ROLES_MESSAGES,
  ...AUTH_MESSAGES,
};
