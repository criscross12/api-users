export interface IRecoveryPassword {
  user_uuid: string;
  email: string;
  phone: string;
  recovery_password_code: string;
  created_at: Date;
}
