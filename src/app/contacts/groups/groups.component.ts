import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ContactsService} from "../contacts.service";
import {NotificationsService} from "../../core/notifications/notifications.service";
import {CreateGroupData, UpdateGroupData} from "../contacts.data";
import {Group} from "../shared/group.model";
import {ConfirmDialogService} from "../../core/confirm-dialog/confirm-dialog.service";

@Component({
  selector: 'crm-contact-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  @Input() groups: Group[];
  @Input() contactsBookId: number;
  @Input() isOwner: boolean;
  @Output() newGroupEvent = new EventEmitter<Group>();
  @Output() editGroupEvent = new EventEmitter();
  @Output() deleteGroupEvent = new EventEmitter();
  @Output() filterEvent = new EventEmitter<Group>();

  private newGroup: string = '';
  private newGroupName: string = '';
  private enableEditGroup: boolean = false;
  private activeGroup: string = '';
  private currentGroupToEdit: string = '';

  constructor(private contactsService: ContactsService,
              private notificationsService: NotificationsService,
              private confirmDialogService: ConfirmDialogService) {
  }

  switchEditField(index) {
    this.enableEditGroup = !this.enableEditGroup;
    this.activeGroup = index;
    this.newGroupName = this.groups[index].name;
    this.currentGroupToEdit = this.newGroupName;
  }

  addGroup() {
    let exists = this.groups.some((item) => item.name === this.newGroup);

    if (this.newGroup.trim() && !exists) {
      this.contactsService.createGroup(new CreateGroupData(this.newGroup, this.contactsBookId)).subscribe(
        (group: Group) => {
          this.notificationsService.success('Group created');
          this.newGroupEvent.emit(group);
          this.newGroup = '';
        },
        error => {
          console.log(error)
        });
    } else {
      this.notificationsService.info('Group already exists');
    }
  }

  editGroup(id: number) {
    if (this.currentGroupToEdit === this.newGroupName) {// if no changes
      this.enableEditGroup = false;
      this.activeGroup = '';
    } else { // edited group name
      let exists = this.groups.some((item) => item.name === this.newGroupName);
      if (this.newGroupName.trim() && !exists) {

        this.contactsService.updateGroup(new UpdateGroupData(this.newGroupName, id)).subscribe(
          ok => {
            this.enableEditGroup = false;
            this.activeGroup = '';
            this.editGroupEvent.emit(new Group(this.newGroupName, id));
            this.notificationsService.success('Group updated')
          },
          error => {
            this.notificationsService.error(error.json())
          }
        );
      } else {
        this.notificationsService.info('Group with this name already exist')
      }
    }
  }

  deleteGroup(id: number) {
    this.confirmDialogService.ask('You really want delete group?', 'Delete', 'Delete group confirmation').then(
      confirm => {
        this.contactsService.deleteGroup(id).subscribe(
          ok => {
            this.deleteGroupEvent.emit(id);
            this.notificationsService.success('Group deleted')
          },
          error => this.notificationsService.error(error.json())
        );
      },
      cancel => console.debug('Canceled')
    );
  }

  ngOnInit() {
  }

  onSelectGroup(group: Group) {
    this.filterEvent.emit(group);
  }

  isGroupNameToLong() {
    return this.newGroup.length > 25;
  }

  isNewGroupNameToLong() {
    return this.newGroupName.length > 25;
  }


}
