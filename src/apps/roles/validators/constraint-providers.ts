import { CheckTheRoleExistByUuidConstraint } from './check-role-exist-by-uuid.validator';
import { CheckTheRoleExistConstraint } from './check-role-exist.validator';
import { CheckTheRoleDoesNotExistByNameKeyConstraint } from './check-role-name-key.validator';

export const rolesConstraintProvicers = [
  CheckTheRoleExistConstraint,
  CheckTheRoleExistByUuidConstraint,
  CheckTheRoleDoesNotExistByNameKeyConstraint,
];
