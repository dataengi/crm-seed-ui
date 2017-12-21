import {User} from "../auth/user.model";

export interface Profile {
  nickname: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;

  user?: User;
  id?: number;
  userId?: number;
  email?:string;
}
