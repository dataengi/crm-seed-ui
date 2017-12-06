import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {NotificationsService} from "./notifications.service";
import {Notification} from "./notification.model";

@Component({
  selector: 'crm-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  //bottom-right, bottom-left, top-right, top-left, top-center, bottom-center, center-center
  position: string = 'bottom-right';
  timeout: number = 5000;
  limit: number = 6;

  notifications: Notification[] = [];

  private notificationSubscription: Subscription;

  constructor(private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.notificationSubscription = this.notificationsService.notificationsState
      .subscribe((notification: Notification) => {
        if (this.notifications.length >= this.limit) {
          this.notifications.shift();
        }
        this.notifications.push(notification);
        this.setTimeout(notification);
      })
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
  }

  close(notification: Notification) {
    this.clear(notification.id);
  }

  clear(id: number) {
    if (id) {
      this.notifications.forEach((notification: Notification, index: number) => {
        if (notification.id === id) {
          this.notifications.splice(index, 1);
        }
      });
    } else {
      throw new Error('Notification without id')
    }
  }

  private setTimeout(notification: Notification) {
    window.setTimeout(() => {
      this.clear(notification.id);
    }, this.timeout);
  }
}
