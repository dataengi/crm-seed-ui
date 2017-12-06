import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap/modal";
import {Subscription} from "rxjs";
import {ConfirmDialogService} from "./confirm-dialog.service";

@Component({
  selector: 'crm-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {

  @ViewChild('confirmDialogModal') private confirmDialogModal: ModalDirective;

  private subscription: Subscription;

  title: string;
  message: string;
  button: string;

  constructor(private confirmDialogService: ConfirmDialogService) {
  }

  ngOnInit() {
    this.subscription = this.confirmDialogService.askState.subscribe(data => {
      this.title = data.title;
      this.message = data.message;
      this.button = data.button;
      this.showModal();
    });

    this.subscription.add(this.confirmDialogModal.onHide.subscribe(() => this.confirmDialogService.cancel()))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  showModal() {
    this.confirmDialogModal.show();
  }

  hideModal() {
    this.confirmDialogModal.hide();
  }

  onConfirm() {
    this.confirmDialogService.confirm();
    this.hideModal();
  }

}
