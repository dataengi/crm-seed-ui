import {Injectable} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {Subscription, Subject} from "rxjs";
import {ProfileService} from "./profile.service";
import {Profile} from "../models/profile/profile.model";
import {HttpClient} from "@angular/common/http";
import 'rxjs/Rx';

@Injectable()
export class CompanyProfilesService{
  private setProfilesSubscription: Subscription;

  public profiles = [];
  private profilesSubject = new Subject<void>();

  constructor(private http: HttpClient,
              private authService: AuthService,
              private profileService: ProfileService) {

    //TODO: Remove this logic. Its hard to understand;
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
  setProfiles() {
      return this.http.get<any>('auth/api/v1/management/users/company/current/members')
        .mergeMap((res:Profile[]) => {
          let users = res;
          return this.http.post('/api/v1/profile/get/users', JSON.stringify({userIds: users.map(user => user.id)}))
            .map(
              (profiles: Profile[]) => {
                let obj = {};
                profiles.forEach(profile => obj[profile.userId] = profile);
                users.forEach(user =>{
                  obj[user.id].user = user;
                });
                return obj;
              })
            .map((response: Object)=>{
               this.profiles = Object.keys(response).map(key => response[key]);
               this.profilesSubject.next();
               return this.profiles;
            })
        })
  }

}
