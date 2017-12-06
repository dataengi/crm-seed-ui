import {Role} from "../../core/models/auth/role.model";
import {Company} from "../../core/models/auth/company.model";
import {InviteStatus} from "./invite-status.type";

export interface Invite {
  id?: number,
  email: string;
  role: Role;
  companyId?: number;
  company?: Company;
  expiredDate: number;
  status: InviteStatus;
  invitedBy?: number;
}
