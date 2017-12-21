import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {SpinnerService} from "../core/spinner/spinner.service";
import {CRMValidators} from "../shared/validators/CRMValidators";


@Component({
  selector: 'crm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private ss: SpinnerService) {
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
}
