export class InviteStatuses {
  static readonly Waiting: InviteStatus = "Waiting";
  static readonly Registered: InviteStatus = "Registered";
  static readonly Expired: InviteStatus = "Expired";
}

export type InviteStatus = "Waiting" | "Registered" | "Expired"
