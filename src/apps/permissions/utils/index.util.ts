import { PermissionDto } from '../dto/permission.dto';

export class UtilPermission {
  addApiKeyToPermission = (data: PermissionDto[], api_key: string) =>
    data.map((item) => {
      item.api_key = api_key;
      return item;
    });
}
