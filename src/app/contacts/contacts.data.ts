import {Group} from "./shared/group.model";

export class CreateGroupData {
  constructor(public name: string,
              public contactsBookId: number) {
  }
}

export class UpdateGroupData {
  constructor(public name: string,
              public groupId: number) {
  }
}

export class RemoveContactsData {
  constructor(public contactIds: number[]) {
  }
}

export class AddContactsToGroupData {
  constructor(public groupId: number,
              public contactIds: number[]) {
  }
}

export class GroupSelectItem {
  public id: number;
  public text: string;

  constructor(group: Group){
    this.id = group.id;
    this.text = group.name;
  }
}

export class RemoveContactsFromGroupData {
  constructor(public groupId: number,
              public contactIds: number[]) {
  }
}
