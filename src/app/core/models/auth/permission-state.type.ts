export class PermissionStates {
  static readonly Allow: PermissionState = "Allow";
  static readonly Deny: PermissionState = "Deny";
}

export type PermissionState = "Allow" | "Deny";
