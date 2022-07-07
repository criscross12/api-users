import { CheckUserDoesntExistByEmailConstraint } from './check-user-doesnt-exist-by-email.validator';
import { CheckUserDoesntExistByPhoneConstraint } from './check-user-doesnt-exist-by-phone.validator';
import { CheckUserExistByEmailConstraint } from './check-user-exist-by-email.validator';
import { CheckUserExistByPhoneConstraint } from './check-user-exist-by-phone.validator';
import { CheckUserExistByUuidConstraint } from './check-user-exist-by-uuid.validator';

export const usersConstraintProvicers = [
  CheckUserDoesntExistByEmailConstraint,
  CheckUserDoesntExistByPhoneConstraint,
  CheckUserExistByEmailConstraint,
  CheckUserExistByPhoneConstraint,
  CheckUserExistByUuidConstraint,
];
