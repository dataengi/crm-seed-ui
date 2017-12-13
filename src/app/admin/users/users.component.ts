import {Component, OnInit} from "@angular/core";
import {CompanyProfilesService} from "../../core/profile/company-profiles.service";
import {Profile} from "../../core/models/profile/profile.model";
import {ConfirmDialogService} from "../../core/confirm-dialog/confirm-dialog.service";
import {UsersService} from "./users.service";
import {UserStates} from "../../core/models/auth/user-state.type";
import {PermissionsService} from "../../core/auth/permissions.service";
import {Actions} from "../../core/models/auth/action.type";
import {AuthService} from "../../core/auth/auth.service";


@Component({
  selector: 'crm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  profiles: Profile[];

  userStates = UserStates;

  constructor(private companyProfilesService: CompanyProfilesService,
              private confirmDialogService: ConfirmDialogService,
              private usersService: UsersService,
              private permissionsService: PermissionsService,
              private authService: AuthService) { }

  ngOnInit() {
    this.profiles = this.companyProfilesService.getProfilesList();
  }

  showActions(profile: Profile) {
    return this.permissionsService.isAllow(Actions.CompanyManagement) && profile.userId !== this.authService.getUser().id
  }


  onActivateUser(profile: Profile) {
    this.confirmDialogService.ask('You really want activate ' + profile.nickname, 'Activate', 'User activation').then(
      ()=> {
        this.usersService.activateUser(profile.userId).subscribe(
          ok => profile.user.state = UserStates.Activated,
          error => console.error(error)
        )
      },
      cancel => console.log('cancel')
    )
  }

  onDeactivateUser(profile: Profile) {
    this.confirmDialogService.ask('You really want deactivate ' + profile.nickname, 'Deactivate', 'User deactivation').then(
      ()=> {
        this.usersService.deactivateUser(profile.userId).subscribe(
          ok => profile.user.state = UserStates.Deactivated,
          error => console.error(error)
        )
      },
      cancel => console.log('cancel')
    )
  }

}
