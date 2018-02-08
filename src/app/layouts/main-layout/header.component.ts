import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../core/auth/auth.service";
import {ProfileService} from "../../core/profile/profile.service";
import {Router} from "@angular/router";
import {NotificationsService} from "../../core/notifications/notifications.service";
import {Profile} from "../../core/models/profile/profile.model";
import { KeycloakProfile} from 'keycloak-js'
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'crm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  profile: Profile;
  profileFromKeyCloak: KeycloakProfile;
  private profileStateSubscription: Subscription;

  private subscription: Subscription;

  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private router: Router,
              private ks: KeycloakService,
              private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.profileFromKeyCloak = this.profileService.ksp;
  }

  ngOnDestroy(){
    this.profileStateSubscription.unsubscribe();
    if (typeof this.subscription !== 'undefined') {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    this.authService.signOut();
  }
}
