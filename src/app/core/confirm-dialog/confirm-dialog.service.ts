import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ConfirmDialogData} from "./confirm-dialog.data";

@Injectable()
export class ConfirmDialogService {

  private askConfirmSubject = new Subject<ConfirmDialogData>();
  public askState = this.askConfirmSubject.asObservable();

  ask(message: string, submitButton: string = 'Submit', title: string = '') {
    this.askConfirmSubject.next(new ConfirmDialogData(message, submitButton, title));
    return new Promise<void>((confirm, cancel) => {
      this.confirm = () => confirm();
      this.cancel = () => cancel();
    })
  }

  confirm: () => void;
  cancel: () => void;

}
