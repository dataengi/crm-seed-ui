import {Injectable} from "@angular/core";
import {AuthHttp} from "../auth/auth-http.service";
import {AuthService} from "../auth/auth.service";
import {Subscription, Subject} from "rxjs";
import {ProfileService} from "./profile.service";
import {Profile} from "../models/profile/profile.model";
import 'rxjs/Rx';
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable()
export class CompanyProfilesService {
  private setProfilesSubscription: Subscription;

  private profiles: {[key: number]: Profile} = {};
  private profilesSubject = new Subject<void>();

  constructor(private http: HttpClient,
              private authService: AuthService,
              private profileService: ProfileService) {

    if (authService.isLoggedIn()) {
      this.setProfilesSubscription = this.setProfiles().subscribe();
    }

    profileService.profileState.subscribe(()=> {
      if (this.setProfilesSubscription) {
        this.setProfilesSubscription.unsubscribe();
      }
      this.setProfilesSubscription = this.setProfiles().subscribe()
    });
  }

  private setProfiles() {
    this.profiles = {};
    return this.http.get<any>('auth/api/v1/management/users/company/current/members')
      .mergeMap((res) => {
        let users = res;
        return this.http.post('/api/v1/profile/get/users', JSON.stringify({userIds: users.map(user => user.id)}))
          .map(
            (profiles: Profile[]) => {
              profiles.forEach(profile => this.profiles[profile.userId] = profile);
              users.forEach(user => this.profiles[user.id].user = user);
              this.profilesSubject.next();
          })
      })
  }

  getProfilesList(): Profile[] {
    return Object.keys(this.profiles).map(key => this.profiles[key]);
  }

}
