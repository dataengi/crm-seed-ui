import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Router} from "@angular/router";
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
  private readonly errorMessageKey = "X-Error-Message";

  private loggedIn: boolean = true;
  private user: User = new EmptyUser;

  private userSubject = new Subject<User>();

  public userState = this.userSubject.asObservable();

  constructor(private http: Http,
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
      .map(res => res.json())
      .map(res => {
        if (!!res.token) {
          localStorage.setItem(this.authTokenKey, res.token);
          this.loggedIn = true;
          this.setUser();
        }
        return res
      })
      .catch(rs => this.processError(rs))
  }

  signUp(password: string, hash: string) {
    return this.http.post('/auth/api/v1/authentication/signUp/' + hash, JSON.stringify({password}))
      .map(res => res.json())
      .map(res => {
        if (!!res.token) {
          localStorage.setItem(this.authTokenKey, res.token);
          this.loggedIn = true;
          this.setUser();
        }
        return res
      })
      .catch(rs => this.processError(rs))
  }

  signOut() {
    return this.http.post('/auth/api/v1/authentication/signOut', {})
      .catch(error => {
        if (error.status === 401) {
          this.cleanToken()
        }
        return Observable.throw(error);
      })
      .map(rs => {
        localStorage.removeItem(this.authTokenKey);
        this.loggedIn = false;
      });
  }

  startResetPassword(email: string) {
    localStorage.removeItem(this.authTokenKey);
    return this.http.post('auth/api/v1/authentication/password/forgot', JSON.stringify({email}))
      .map(res => res.json())
      .catch(rs => this.processError(rs))
  }

  resetPassword(hash: string, password: string) {
    localStorage.removeItem(this.authTokenKey);
    return this.http.post('/auth/api/v1/authentication/password/recover/' + hash, JSON.stringify({newPassword: password}))
      .map(res => res.json())
      .map(res => {
        if (!!res.token) {
          localStorage.setItem(this.authTokenKey, res.token);
          this.loggedIn = true;
          this.setUser();
        }
        return res
      })
      .catch(rs => this.processError(rs))
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
      .map(res => res.json())
      .subscribe(
        (user: User) => {
          this.user = user;
          this.permissionsService.setPermissions(user.role.permissions);
          this.userChanged();
        },
        error => {
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

  processUnauthorized(response: Response): void {
    console.log('Process unauthorized', response);
    if (response.status === 401) {
      this.cleanToken();
      this.notificationsService.error(response.json())
    }
  }

  private processError(response: Response) {
    this.processUnauthorized(response);
    console.log('process error', response);
    return Observable.throw(response);
  }

  private cleanToken() {
    localStorage.removeItem(this.authTokenKey);
    this.loggedIn = false;
    this.router.navigate(['/auth']);
  }

  private userChanged() {
    this.userSubject.next(this.user);
  }

}
