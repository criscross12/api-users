export class UtilRole {
  mergePermisions = (
    permissions1: Array<string>,
    permissions2: Array<string>,
  ): Array<string> => [...new Set([...permissions1, ...permissions2])];

  removePermissions = (
    permissions: Array<string>,
    permissionsRemove: Array<string>,
  ): Array<string> =>
    permissions.filter((p) => permissionsRemove.indexOf(p) == -1);
}
