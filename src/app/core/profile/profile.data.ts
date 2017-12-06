import {Profile} from "../models/profile/profile.model";
import {User} from "../models/auth/user.model";
import {ShortProfile} from "../models/profile/short-profile.model";

export interface UpdateProfileData {
  nickname: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export class EmptyProfile implements Profile {
  nickname = '';
  firstName = '';
  lastName = '';
  avatarUrl = '/assets/img/avatars/no-avatar.png';

  constructor(public user: User) {
  }

  toShort() {
    return new ShortProfile(this.nickname, this.avatarUrl)
  }
}

export class ProfileImpl implements Profile {
  nickname = '';
  firstName = '';
  lastName = '';
  avatarUrl = '';

  constructor(public user: User) {
  }

  setFields(updateData: UpdateProfileData) {
    this.nickname = updateData.nickname;
    this.firstName = updateData.firstName;
    this.lastName = updateData.lastName;
    this.avatarUrl = updateData.avatarUrl;
    return this
  }

}
