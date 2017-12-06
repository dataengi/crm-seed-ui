import {Injectable} from "@angular/core";
import {AuthHttp} from "../auth/auth-http.service";
import {EmptyProfile} from "./profile.data";
import {SelectItem} from "../../shared/models/select-item";
import {AuthService} from "../auth/auth.service";
import {Subscription, Subject} from "rxjs";
import {ProfileService} from "./profile.service";
import {EmptyUser} from "../models/auth/user.model";
import {Action} from "../models/auth/action.type";
import {PermissionStates} from "../models/auth/permission-state.type";
import {Profile} from "../models/profile/profile.model";
import {ShortProfile} from "../models/profile/short-profile.model";
import {UserStates} from "../models/auth/user-state.type";
import 'rxjs/Rx';

@Injectable()
export class CompanyProfilesService {

  private unknownProfile: EmptyProfile = new EmptyProfile(new EmptyUser);
  private setProfilesSubscription: Subscription;

  private profiles: {[key: number]: Profile} = {};
  private profilesSubject = new Subject<void>();
  public profilesState = this.profilesSubject.asObservable();

  constructor(private http: AuthHttp,
              private authService: AuthService,
              private profileService: ProfileService) {

    if (authService.isLoggedIn()) {
      this.setProfilesSubscription = this.setProfiles().subscribe(ok => {
      });
    }

    profileService.profileState.subscribe(profile => {
      if (this.setProfilesSubscription) {
        this.setProfilesSubscription.unsubscribe();
      }
      this.setProfilesSubscription = this.setProfiles().subscribe(ok => {
      })
    });

  }

  private setProfiles() {
    this.profiles = {};
    return this.http.get('auth/api/v1/management/users/company/current/members')
      .flatMap(res => {
        let users = res.json();
        return this.http.post('/api/v1/profile/get/users', JSON.stringify({userIds: users.map(user => user.id)}))
          .map(rs => rs.json())
          .map((profiles: Profile[]) => {
            profiles.forEach(profile => this.profiles[profile.userId] = profile);
            users.forEach(user => this.profiles[user.id].user = user);
            this.profilesSubject.next();
          })
      })
  }

  getProfile(userId: number): Profile {
    return this.profiles[userId] ? this.profiles[userId] : this.unknownProfile
  }

  getShortProfile(userId: number): ShortProfile {
    if (typeof userId === 'undefined') {
      return new ShortProfile('CRM system', '/assets/img/avatars/no-avatar.png')
    }
    let profile = this.profiles[userId];
    if (profile) {
      let name = profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : profile.nickname;
      return new ShortProfile(name, profile.avatarUrl)
    } else {
      //todo update local profiles
      return this.unknownProfile.toShort()
    }
  }

  getProfilesList(): Profile[] {
    return Object.keys(this.profiles).map(key => this.profiles[key]);
  }

  getAllForSelect(): SelectItem[] {
    let profilesArray: Profile[] = Object.keys(this.profiles).map(key => this.profiles[key]);
    return this.buildSelectItems(profilesArray.filter(profile => profile.user.state === UserStates.Activated))
  }

  getForSelectByAction(action: Action) {
    let profilesArray: Profile[] = Object.keys(this.profiles).map(key => this.profiles[key]);
    let filteredProfiles = profilesArray
      .filter(profile => profile.user.state === UserStates.Activated)
      .filter(profile => {
      let permission = profile.user.role.permissions.find(p => p.action === action);
      return !!permission && permission.state === PermissionStates.Allow
    });
    return this.buildSelectItems(filteredProfiles)
  }

  private buildSelectItems(profiles: Profile[]): SelectItem[] {
    const currentUserId = this.authService.getUser().id;
    let items = [];
    profiles.forEach(profile => {
      let nick = profile.userId !== currentUserId ? profile.nickname : "me";
      let text = profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName} (${nick})` : nick;
      let html = `<img src="${profile.avatarUrl}" width="14"> ${text}`;
      items.push(new SelectItem(html, profile.userId))
    });
    items.unshift(new SelectItem("Unassigned", "none"));
    return items
  }

}
