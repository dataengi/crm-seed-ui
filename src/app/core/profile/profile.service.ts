import {Injectable} from "@angular/core";
import {EmptyProfile, UpdateProfileData, ProfileImpl} from "./profile.data";
import {AuthService} from "../auth/auth.service";
import {Subject, Subscription, Observable} from "rxjs";
import {AuthHttp} from "../auth/auth-http.service";
import {User} from "../models/auth/user.model";
import {Profile} from "../models/profile/profile.model";


@Injectable()
export class ProfileService {

  getProfileSubscription: Subscription;

  private profile: Profile = new EmptyProfile(this.authService.getUser());
  private profileSubject = new Subject<Profile>();
  profileState = this.profileSubject.asObservable();

  constructor(private authService: AuthService, private http: AuthHttp) {
    if (authService.isLoggedIn()) {
      this.updateLocalProfile(authService.getUser());
    }
    this.authService.userState.subscribe(user => this.updateLocalProfile(user))
  }

  updateProfile(profile: UpdateProfileData) {
    return this.http.post('/api/v1/profile/update', JSON.stringify(profile)).map(rs => {
      this.profile = new ProfileImpl(this.authService.getUser()).setFields(profile);
      this.profileSubject.next(this.profile);
      return rs.json()
    })
  }

  getProfile(user: User): Observable<Profile> {
    return this.http.get('/api/v1/profile').map(rs => {
      this.profile = rs.json();
      this.profile.user = user;
      this.profileSubject.next(this.profile);
      return rs.json();
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
