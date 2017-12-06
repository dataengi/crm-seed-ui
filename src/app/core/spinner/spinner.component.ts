import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {SpinnerService} from "./spinner.service";
import {SpinnerState} from "./spinner-state";

@Component({
  selector: 'crm-spinner',
  template: `
    <div class="spinner-wrapper" [class.spinner-hidden]="!visible">
      <div class="loader"></div>
    </div>
  `,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  visible = false;

  private spinnerStateChanged: Subscription;

  constructor(private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerStateChanged = this.spinnerService.spinnerState
      .subscribe((state: SpinnerState) => {
        this.visible = state.show;
      })
  }

  ngOnDestroy() {
    this.spinnerStateChanged.unsubscribe()
  }

}
