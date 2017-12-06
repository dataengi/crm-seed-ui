import {Company} from "./company.model";
import {Role} from "./role.model";
import {UserState} from "./user-state.type";

export class User {

  state?: UserState;

  constructor(public email: string,
              public company: Company,
              public role: Role,
              public id?: number) {
  }

}

export class EmptyUser extends User {
  constructor() {
    super("", {id: -1, name: ""}, {id: 0, name: "", permissions: []}, -1);
  }
}
