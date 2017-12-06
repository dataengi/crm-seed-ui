export class UserStates {
  static readonly Activated: UserState = "Activated";
  static readonly Deactivated: UserState = "Deactivated";
}

export type UserState = "Activated" | "Deactivated"
