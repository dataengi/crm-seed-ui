import {Component, ViewChildren, OnDestroy} from "@angular/core";
import {DropdownDirective} from "./dropdown.directive";
import {PermissionsService} from "../../core/auth/permissions.service";
import {Actions} from "../../core/models/auth/action.type";
import {Subscription} from "rxjs";
import {ProfileService} from "../../core/profile/profile.service";

@Component({
  selector: 'crm-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnDestroy {

  showAdmin: boolean;
  showInvites: boolean;
  showUsers: boolean;
  showRoot: boolean = false;
  actions = Actions;

  private psSubscription: Subscription;
  private profileSubscription: Subscription;

  constructor(public ps: PermissionsService, private profileService: ProfileService) {
    this.setPermissions();
    this.psSubscription = this.ps.changes.subscribe(() => this.setPermissions());
    this.profileSubscription = this.profileService.profileState.subscribe(() => this.setPermissions());
  }

  ngOnDestroy() {
    this.psSubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
  }

  @ViewChildren(DropdownDirective) dropdownDirectives;

  closeOtherDropdown(sd: DropdownDirective) {
    this.dropdownDirectives.forEach((entry: DropdownDirective) => {
      if (entry !== sd) {
        entry.close()
      }
    });
  }

  private setPermissions() {

    this.showAdmin = this.ps.isAllow(Actions.UsersManagement);
    this.showInvites = this.ps.isAllow(Actions.InviteUser);
    this.showUsers = this.ps.isAllow(Actions.UsersManagement);
    this.showRoot = this.ps.isAllow(Actions.CompaniesManagement);
  }

}
