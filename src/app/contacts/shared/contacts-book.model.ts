import {Contact} from "./contact.model";
import {Group} from "./group.model";

export class ContactsBook {
  constructor(public contacts: Contact[],
              public groups: Group[],
              public createDate: number,
              public ownerId: number,
              public id?: number) {
  }
}
