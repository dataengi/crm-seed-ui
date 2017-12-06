import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Notification} from "./notification.model";
import {ResponseError} from "../../shared/models/response-error";

@Injectable()
export class NotificationsService {

  private id: number = 1;

  private notificationsSubject = new Subject<Notification>();

  notificationsState = this.notificationsSubject.asObservable();

  constructor() {
  }

  default(message: string, title?: string) {
    this.add('type-default', message, title);
  }


  info(message: string, title?: string) {
    this.add('type-info', message, title);
  }


  success(message: string, title?: string) {
    this.add('type-success', message, title);
  }

  wait(message: string, title?: string) {
    this.add('type-wait', message, title);
  }

  error(message: ResponseError | string, title?: string) {
    if (this.isString(message)) {
      this.add('type-error', <string>message, title);
    } else {
      if ((<ResponseError>message).message) {
        this.add('type-error', (<ResponseError>message).message, title)
      } else {
        this.add('type-error', "Server error", title)
      }
    }
  }

  private add(type: string, msg: string, title?: string) {
    this.notificationsSubject.next(new Notification(this.id++, type, msg, title))
  }

  private isString(obj: any): boolean {
    return typeof obj === "string"
  }

}
