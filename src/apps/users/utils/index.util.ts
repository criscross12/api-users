import * as bcrypt from 'bcrypt';
import * as moment from 'moment';

export class UtilUser {
  getPasswordEncript = async (password): Promise<string> =>
    await bcrypt.hash(password, await bcrypt.genSalt(10));

  getTokenForRecoveryPassword = (): string =>
    this.getStringRandom() +
    this.getStringRandom() +
    '_' +
    this.getStringRandom() +
    this.getStringRandom();

  getStringRandom = (): string => Math.random().toString(36).substr(2);

  getNameOfEmail = (email: string): string =>
    email.substring(0, email.search('@'));

  mergePermisions = (
    permissions1: Array<string>,
    permissions2: Array<string>,
  ): Array<string> => [...new Set([...permissions1, ...permissions2])];

  mergeRoles = (
    roles1: Array<string>,
    roles2: Array<string>,
  ): Array<string> => [...new Set([...roles1, ...roles2])];

  removePermissions = (
    permissions: Array<string>,
    permissionsRemove: Array<string>,
  ): Array<string> =>
    permissions.filter((p) => permissionsRemove.indexOf(p) == -1);

  removeRoles = (
    roles: Array<string>,
    rolesRemove: Array<string>,
  ): Array<string> => roles.filter((r) => rolesRemove.indexOf(r) == -1);
}

export const generateRandomCode = () => {
  let text = '';
  const possible = '0123456789';
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

export const generateToken = () => {
  const value = Math.random().toString(36).substr(2);
  return value + value + value + value; // Para hacer el token más largo
};

export const getTimeInMinutesPassedOf = (date: Date): number => {
  const from = moment(new Date());
  const to = moment(date);
  const diff = moment.duration(from.diff(to)).asMinutes();
  return diff;
};

const random = () => {
  return Math.random().toString(36).substring(2); // Eliminar `0.`
};

export const generateTokenToRecoveryPassword = () => {
  return random() + random() + random();
};
