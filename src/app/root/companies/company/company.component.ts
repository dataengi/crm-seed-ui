import {Component, OnInit} from "@angular/core";
import {Profile} from "../../../core/models/profile/profile.model";
import {UserStates} from "../../../core/models/auth/user-state.type";
import {ConfirmDialogService} from "../../../core/confirm-dialog/confirm-dialog.service";
import {PermissionsService} from "../../../core/auth/permissions.service";
import {Actions} from "../../../core/models/auth/action.type";
import {ActivatedRoute} from "@angular/router";
import {CompanyService} from "./company.service";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'crm-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  profiles: Profile[] = [];

  userStates = UserStates;

  companyId: number;

  constructor(private confirmDialogService: ConfirmDialogService,
              private permissionsService: PermissionsService,
              private route: ActivatedRoute,
              private companyService: CompanyService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.companyId = +this.route.snapshot.params['id'];
    this.companyService.getCompanyUsers(this.companyId).subscribe(
      profiles => {
        this.profiles = profiles;
        console.log(this.profiles);
      },
      error => console.log(error)
    )
  }

  showActions(profile: Profile) {
    return this.permissionsService.isAllow(Actions.CompanyManagement) && profile.userId !== this.authService.getUser().id
  }


  onActivateUser(profile: Profile) {
    this.confirmDialogService.ask('You really want activate ' + profile.nickname, 'Activate', 'User activation').then(
      () => {
        this.companyService.activateUser(profile.userId).subscribe(
          ok => profile.user.state = UserStates.Activated,
          error => console.error(error)
        )
      },
      cancel => console.log('cancel')
    )
  }

  onDeactivateUser(profile: Profile) {
    this.confirmDialogService.ask('You really want deactivate ' + profile.nickname, 'Deactivate', 'User deactivation').then(
      () => {
        this.companyService.deactivateUser(profile.userId).subscribe(
          ok => profile.user.state = UserStates.Deactivated,
          error => console.error(error)
        )
      },
      cancel => console.log('cancel')
    )
  }

}
