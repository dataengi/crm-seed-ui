import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {AuthRoutingModule} from "./auth.routing";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SharedModule} from "../shared/shared.module";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {StartResetComponent} from "./reset-password/start-reset.component";


@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    ResetPasswordComponent,
    StartResetComponent
  ]
})
export class AuthModule {
}
