import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NotificationsService} from "../notifications/notifications.service";
import {Observable, Subject} from "rxjs";
import {PermissionsService} from "./permissions.service";
import {User, EmptyUser} from "../models/auth/user.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Injectable()
export class AuthService {

  private readonly authTokenKey = 'xZaSwqS';
  private loggedIn: boolean = true;
  private user: User = new EmptyUser();
  private userFromKeyCloak: KeycloakProfile;

  constructor(private http: HttpClient,
              private router: Router,
              private notificationsService: NotificationsService,
              private permissionsService: PermissionsService,
              private keycloakService: KeycloakService) {
    this.setUser();
  }


  signIn(email: string, password: string, rememberMe: boolean = false) {
    return this.http.post('/auth/api/v1/authentication/signIn', JSON.stringify({email, password, rememberMe}))
      .map((res:HttpResponse<any>) => {
        if (!!res['token']) {
          localStorage.setItem(this.authTokenKey, res['token']);
          this.loggedIn = true;
          this.setUser();
        }
        return res
      })
      .catch((error: HttpErrorResponse) => this.processError(error))
  }

  signUp(password: string, hash: string) {
    return this.http.post('/auth/api/v1/authentication/signUp/' + hash, JSON.stringify({password}))
      .map((res:HttpResponse<any>) => {
        if (!!res['token']) {
          localStorage.setItem(this.authTokenKey, res['token']);
          this.loggedIn = true;
          this.setUser();
        }
        return res
      })
      .catch((error:HttpErrorResponse) => this.processError(error))
  }

  signOut() {
    this.keycloakService.logout('http://localhost:4200/');
  }

   async setUser() {
    this.userFromKeyCloak = await this.keycloakService.loadUserProfile();
    // this.http.get('auth/api/v1/authentication/identity')
    //   .subscribe(
    //     (user: User) => {
    //       this.user = user;
    //       this.permissionsService.setPermissions(user.role.permissions);
    //     },
    //     (error:HttpErrorResponse) => {
    //       console.error(error.error);
    //     }
    //   )
  }

  getUserFromKeyCloak(){
    return this.userFromKeyCloak;
  }

  getUser() {
    return this.user;
  }

  processUnauthorized(response: HttpErrorResponse): void {
    if (response.status === 401) {
      this.notificationsService.error(response.error)
    }
  }

  private processError(response: HttpErrorResponse) {
    this.processUnauthorized(response);
    return Observable.throw(response);
  }

}
