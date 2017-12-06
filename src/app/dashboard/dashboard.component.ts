import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {NotificationsService} from "../core/notifications/notifications.service";
import {AuthHttp} from "../core/auth/auth-http.service";
import {SpinnerService} from "../core/spinner/spinner.service";
import {CRMValidators} from "../shared/validators/CRMValidators";
import {CompanyProfilesService} from "../core/profile/company-profiles.service";


@Component({
  selector: 'crm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private router: Router,
              private notificationsService: NotificationsService,
              private authHttp: AuthHttp, private ss: SpinnerService, private companyProfilesService: CompanyProfilesService) {
  }

  ngOnInit(): void {

  }

  show() {
    this.ss.show();
  }

  hide() {
    this.ss.hide();
  }

  ev(event: Event) {
    console.log(event)
  }

  items = ["asdasdasd", "Asdasdasdasd"];
  reg = CRMValidators.getEmailRegexp();

  ngOnDestroy() {
    if (typeof this.subscription !== 'undefined') {
      this.subscription.unsubscribe();
    }
  }

  testItems = this.companyProfilesService.getAllForSelect();
}
