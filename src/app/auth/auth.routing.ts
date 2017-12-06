import {Routes, RouterModule} from "@angular/router";
import {SignInComponent} from "./sign-in/sign-in.component";
import {NgModule} from "@angular/core";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {LoggedOutOnly} from "../core/auth/auth-guard";
import {StartResetComponent} from "./reset-password/start-reset.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/signIn',
    data: {
      title: 'Auth'
    },
    pathMatch: 'full'
  },
  {
    path: 'signIn',
    component: SignInComponent,
    data: {
      title: 'SignIn'
    },
    canActivate: [LoggedOutOnly]
  },
  {
    path: 'signUp',
    component: SignUpComponent,
    data: {
      title: 'SignUp'
    }
  },
  {
    path: 'startReset',
    component: StartResetComponent,
    data: {
      title: 'StartReset'
    }
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
    data: {
      title: 'ResetPassword'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
