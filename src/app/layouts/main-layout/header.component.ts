import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../core/auth/auth.service";
import {ProfileService} from "../../core/profile/profile.service";
import {Router} from "@angular/router";
import {NotificationsService} from "../../core/notifications/notifications.service";
import {Profile} from "../../core/models/profile/profile.model";

@Component({
  selector: 'crm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  profile: Profile;
  private profileStateSubscription: Subscription;

  private subscription: Subscription;

  constructor(private authService: AuthService,
              private profileService: ProfileService){}

  ngOnInit() {
    this.profile = this.profileService.getLocalProfile();
    this.profileStateSubscription = this.profileService.profileState.subscribe(profile => this.profile = profile);
  }

  ngOnDestroy() {
    this.profileStateSubscription.unsubscribe();
    if (typeof this.subscription !== 'undefined') {
      this.subscription.unsubscribe();
    }
  }

  logout() {
   this.authService.signOut()
  }
}
