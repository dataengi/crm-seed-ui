import {Component, OnInit, Input} from '@angular/core';
import {Invite} from "./invite.model";
import {InvitesService} from "./invites.service";
import {NotificationsService} from "../../core/notifications/notifications.service";
import {InviteStatus, InviteStatuses} from "./invite-status.type";
import {ConfirmDialogService} from "../../core/confirm-dialog/confirm-dialog.service";

@Component({
  selector: 'crm-invites-list',
  templateUrl: './invites-list.component.html',
  styles: [`.action-padding {padding: 0 10px}`]
})
export class InvitesListComponent implements OnInit {

  @Input() invites: Invite[];
  @Input() isRoot: Boolean;

  constructor(private invitesService: InvitesService,
              private notificationsService: NotificationsService,
              private confirmDialogService: ConfirmDialogService) {
  }

  getStatusStyle(status: InviteStatus) {
    switch (status) {
      case InviteStatuses.Registered:
        return "badge-success";
      case InviteStatuses.Waiting:
        return "badge-warning";
      case InviteStatuses.Expired:
        return "badge-danger";
      default:
        return "";
    }
  }

  removeInvite(invite: Invite) {
    this.confirmDialogService.ask('You really want delete invite?', 'Delete', 'Delete invite confirmation').then(
      () => {
        this.invitesService.removeInvite(invite.id).subscribe(
          () => {
            this.invites.splice(this.invites.indexOf(invite), 1);
            this.notificationsService.success("Invite deleted");
          },
          error => this.notificationsService.error(error.error)
        )
      },
      cancel => console.debug('Cancel')
    );
  }

  ngOnInit() {
  }

}
