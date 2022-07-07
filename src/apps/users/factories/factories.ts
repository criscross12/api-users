import { CreateRequestForRecoveryPasswordByEmailFactory } from './create-request-for-recovery-password/create-request-for-recovery-password-by-email.factory';
import { CreateRequestForRecoveryPasswordFactory } from './create-request-for-recovery-password/create-request-for-recovery-password.factory';
import { CreateTokenRecoveryPasswordByEmailFactory } from './create-token-recovery-password/create-token-recovery-password-by-email.factory';
import { CreateTokenRecoveryPasswordFactory } from './create-token-recovery-password/create-token-recovery-password.factory';
import { ChangePasswordByRecoveryPasswordByEmailFactory } from './recovery-password/change-password-by-recovery-password-by-email.factory';
import { ChangePasswordByRecoveryPasswordFactory } from './recovery-password/change-password-by-recovery-password.factory';

export const Factories = [
  CreateRequestForRecoveryPasswordByEmailFactory,
  CreateRequestForRecoveryPasswordFactory,
  CreateTokenRecoveryPasswordByEmailFactory,
  CreateTokenRecoveryPasswordFactory,
  ChangePasswordByRecoveryPasswordByEmailFactory,
  ChangePasswordByRecoveryPasswordFactory,
];
