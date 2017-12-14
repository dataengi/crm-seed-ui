import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NotificationsService} from "../notifications/notifications.service";
import {Observable, Subject} from "rxjs";
import {PermissionsService} from "./permissions.service";
import {User, EmptyUser} from "../models/auth/user.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  private readonly authTokenKey = 'xZaSwqS';
  private readonly tokenInHeader = "X-Auth-Token";
  private loggedIn: boolean = true;
  private user: User = new EmptyUser;
  private userSubject = new Subject<User>();
  public userState = this.userSubject.asObservable();

  constructor(private http: HttpClient,
              private router: Router,
              private notificationsService: NotificationsService,
              private permissionsService: PermissionsService) {

    this.loggedIn = !!localStorage.getItem(this.authTokenKey);
    if (this.loggedIn) {
      this.setUser()
    }

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
    return this.http.post('/auth/api/v1/authentication/signOut', {})
      .map(() => {
        localStorage.removeItem(this.authTokenKey);
        this.loggedIn = false;
      })
      .catch((error:HttpErrorResponse) => {
        if (error.status === 401) {
          this.cleanToken()
        }
        return Observable.throw(error);
      })
  }

  startResetPassword(email: string) {
    localStorage.removeItem(this.authTokenKey);
    return this.http.post('auth/api/v1/authentication/password/forgot', JSON.stringify({email}))
      .map((res:HttpResponse<any>)=>res)
      .catch((error:HttpErrorResponse) => this.processError(error))
  }

  resetPassword(hash: string, password: string) {
    localStorage.removeItem(this.authTokenKey);
    return this.http.post('/auth/api/v1/authentication/password/recover/' + hash, JSON.stringify({newPassword: password}))
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

  isLoggedIn() {
    return this.loggedIn;
  }

  getToken() {
    return localStorage.getItem(this.authTokenKey);
  }

  getHeaderName() {
    return this.tokenInHeader;
  }

  setUser() {
    this.http.get('auth/api/v1/authentication/identity')
      .subscribe(
        (user: User) => {
          this.user = user;
          this.permissionsService.setPermissions(user.role.permissions);
          this.userChanged();
        },
        (error:HttpErrorResponse) => {
          if (error.status === 401) {
            this.cleanToken()
          }
          console.error(error);
        }
      )
  }

  getUser() {
    return this.user;
  }

  processUnauthorized(response: HttpErrorResponse): void {
    console.log('Process unauthorized', response);
    if (response.status === 401) {
      this.cleanToken();
      this.notificationsService.error(response)
    }
  }

  private processError(response: HttpErrorResponse) {
    this.processUnauthorized(response);
    console.log('process error', response);
    return Observable.throw(response);
  }

  private cleanToken() {
    localStorage.removeItem(this.authTokenKey);
    this.loggedIn = false;
    this.router.navigate(['/auth'])
      .catch(()=>console.log('Error during redirect to auth'))
  }

  private userChanged() {
    this.userSubject.next(this.user);
  }

}
