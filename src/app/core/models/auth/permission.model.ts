import {PermissionState} from "./permission-state.type";
import {Action} from "./action.type";

export class Permission {

  constructor(public action: Action, public state: PermissionState) {
  }

}

