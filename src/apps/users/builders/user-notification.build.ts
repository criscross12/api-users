// import { ICreateConfigNotification } from '@notifications/notifications-sdk';
// import { GetUserDto } from '../dto/get-user.dto';
// import { NotificationMethodEnum } from '@notifications/notifications-sdk/enums/index.enum';
// import { ICreateNotificationConfirmationAccount } from '@notifications/notifications-sdk/interfaces/create-notification-for-confirm-account.interface';
// import { ICreateNotificationForRecoveryPassword } from '@notifications/notifications-sdk/interfaces/create-notification-for-recovery-password.interface';

// export const buildJsonCreateNotification = (
//   user: GetUserDto,
// ): ICreateConfigNotification => {
//   return {
//     user: {
//       email: user.email,
//       phone: user.phone,
//       name: user.user_name,
//       language: user.language,
//     },
//     user_uuid: user.uuid,
//   };
// };

// export const buildJsonJsonCreateConfigNotification = (
//   user: GetUserDto,
// ): ICreateConfigNotification => ({
//   user_uuid: user.uuid,
//   user: {
//     name: user.user_name,
//     phone: user.phone ? user.key_phone + user.phone : '',
//     email: user.email ? user.email : '',
//     language: user.language,
//   },
// });

// export const buildJsonCreatedNotificationConfirmationAccount = (
//   user: GetUserDto,
//   confirmation_code: string,
//   notification_by: NotificationMethodEnum,
// ): ICreateNotificationConfirmationAccount => ({
//   user_uuid: user.uuid,
//   data: {
//     confirmation_code,
//   },
//   notification_by: [notification_by],
// });

// export const buildJsonCreateNotificationRecoveryPassword = (
//   user: GetUserDto,
//   recovery_password_code: string,
//   notification_by: NotificationMethodEnum,
// ): ICreateNotificationForRecoveryPassword => ({
//   user_uuid: user.uuid,
//   data: {
//     recovery_password_code,
//   },
//   notification_by: [notification_by],
// });
