import {Permission} from "./permission.model";

export class Role {

  constructor(public name: string, public permissions: Permission[], public id?: number) {
  }

}
