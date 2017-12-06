import {Injectable} from "@angular/core";
import {Permission} from "../models/auth/permission.model";
import {Action, Actions} from "../models/auth/action.type";
import {PermissionStates} from "../models/auth/permission-state.type";
import {Subject} from "rxjs";


@Injectable()
export class PermissionsService {

  private permissions: {[action: string]: Permission} = {};
  private permissionsSubject = new Subject();

  public changes = this.permissionsSubject.asObservable();
  public actions = Actions;

  setPermissions(permissions: Permission[]) {
    this.permissions = {};
    permissions.forEach(permission => this.permissions[permission.action] = permission);
    this.permissionsSubject.next();
  }

  isAllow(action: Action): boolean {
    return this.permissions[action] && this.permissions[action].state === PermissionStates.Allow;
  }

  isSomeAllow(...actions: Action[]) {
    return actions.some(this.isAllow)
  }

  isDeny(action: Action): boolean {
    return !this.permissions[action] || this.permissions[action].state === PermissionStates.Deny;
  }

}
