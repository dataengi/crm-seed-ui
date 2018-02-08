import {Injectable} from "@angular/core";
import {EmptyProfile, UpdateProfileData, ProfileImpl} from "./profile.data";
import {AuthService} from "../auth/auth.service";
import {Subject, Subscription, Observable} from "rxjs";
import {AuthHttp} from "../auth/auth-http.service";
import {User} from "../models/auth/user.model";
import {Profile} from "../models/profile/profile.model";
import {HttpResponse} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";


@Injectable()
export class ProfileService {

  getProfileSubscription: Subscription;

  public ksp;
  private profile: Profile = new EmptyProfile(this.authService.getUser());
  private profileSubject = new Subject<Profile>();
  profileState = this.profileSubject.asObservable();

  constructor(private authService: AuthService, private http: AuthHttp, private ks: KeycloakService) {
    ks.loadUserProfile()
      .then(
        (response)=>{
          console.log('Into Service', response);
          this.ksp = response
        }
      )
  }

  updateProfile(profile: UpdateProfileData) {
    return this.http.post('/api/v1/profile/update', JSON.stringify(profile))
      .map(
        (rs:HttpResponse<any>) => {
          this.profile = new ProfileImpl(this.authService.getUser()).setFields(profile);
          this.profileSubject.next(this.profile);
          return rs
    })
  }

  getProfile(user: User): Observable<Profile> {
    return this.http.get('/api/v1/profile')
      .map(
        (rs:any) => {
          this.profile = rs;
          this.profile.user = user;
          this.profileSubject.next(this.profile);
          return rs;
    })
  }

  getLocalProfile() {
    return this.profile;
  }

  checkNickname(name: string) {
    return this.http.get('/api/v1/profile/check/nickname/' + name)
  }

  private updateLocalProfile(user: User) {
    if (this.getProfileSubscription) {
      this.getProfileSubscription.unsubscribe()
    }
    this.getProfileSubscription = this.getProfile(user).subscribe()
  }


}
