import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SpinnerComponent} from "./spinner/spinner.component";
import {SpinnerService} from "./spinner/spinner.service";
import {NotificationsComponent} from "./notifications/notifications.component";
import {NotificationsService} from "./notifications/notifications.service";
import {AuthService} from "./auth/auth.service";
import {CompaniesManagementGuard, LoggedInOnly, LoggedOutOnly} from "./auth/auth-guard";
import {AuthHttp} from "./auth/auth-http.service";
import {HttpModule, RequestOptions} from "@angular/http";
import {PermissionsService} from "./auth/permissions.service";
import {ProfileService} from "./profile/profile.service";
import {CompanyProfilesService} from "./profile/company-profiles.service";
import {RequestOptionsService} from "./auth/request-options-service";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {ModalModule} from "ngx-bootstrap/modal";
import {ConfirmDialogService} from "./confirm-dialog/confirm-dialog.service";


const RequestOptionsProvider = {provide: RequestOptions, useClass: RequestOptionsService};

const RoutesGuards = [
  LoggedInOnly,
  LoggedOutOnly,
  CompaniesManagementGuard
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ModalModule
  ],
  exports: [
    SpinnerComponent,
    NotificationsComponent,
    ConfirmDialogComponent
  ],
  declarations: [
    SpinnerComponent,
    NotificationsComponent,
    ConfirmDialogComponent
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        RequestOptionsProvider,
        SpinnerService,
        NotificationsService,
        AuthService,
        AuthHttp,
        ...RoutesGuards,
        PermissionsService,
        ProfileService,
        CompanyProfilesService,
        ConfirmDialogService,
      ]
    }
  }

}
