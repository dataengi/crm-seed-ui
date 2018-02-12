import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {PermissionsService} from "./permissions.service";
import {Actions} from "../models/auth/action.type";
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";

@Injectable()
export class LoggedInOnly extends KeycloakAuthGuard{
  constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }
  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log('Is Auth', this.authenticated);
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login();
        return
      }

      const requiredRoles = route.data.roles;
      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true);
      } else {
        if (!this.roles || this.roles.length === 0) {
          resolve(false);
        }
        let granted: boolean = false;
        for (const requiredRole of requiredRoles) {
          if (this.roles.indexOf(requiredRole) > -1) {
            granted = true;
            break;
          }
        }
        resolve(granted);
      }

    });
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
