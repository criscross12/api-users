import { CheckThePermissionExistConstraint } from './check-permission-exist.validator';
import { CheckThePermissionExistByUuidConstraint } from './check-permission-exist-by-uuid.validator';
import { CheckThePermissionDoesNotExistByNameKeyConstraint } from './check-permission-name-key.validator';
import { CheckThePermissionNameKeyDoesNotRepeatConstraint } from './check-permissions-name-key-does-not-repeat.validator';

export const permissionsConstraintProvicers = [
  CheckThePermissionExistConstraint,
  CheckThePermissionDoesNotExistByNameKeyConstraint,
  CheckThePermissionExistByUuidConstraint,
  CheckThePermissionNameKeyDoesNotRepeatConstraint,
];
