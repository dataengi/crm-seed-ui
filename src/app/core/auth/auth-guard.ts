import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {PermissionsService} from "./permissions.service";
import {Actions} from "../models/auth/action.type";

@Injectable()
export class LoggedInOnly implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  };

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/auth', 'signIn']);
      return false
    }
  }
}

@Injectable()
export class LoggedOutOnly implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  };

  canActivate() {
    if (!this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

@Injectable()
export class CompaniesManagementGuard implements CanActivate {

  constructor(private permissionsService: PermissionsService) {
  };

  canActivate() {
    return this.permissionsService.isAllow(Actions.CompaniesManagement)
  }
}
