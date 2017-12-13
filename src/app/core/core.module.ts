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
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {ModalModule} from "ngx-bootstrap/modal";
import {ConfirmDialogService} from "./confirm-dialog/confirm-dialog.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MyInterceptor} from "./auth/auth.interceptor";

const RequestOptionsProviderClient = {provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi:true};

const RoutesGuards = [
  LoggedInOnly,
  LoggedOutOnly,
  CompaniesManagementGuard
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
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
        RequestOptionsProviderClient,
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
