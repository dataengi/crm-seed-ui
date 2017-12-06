import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {title: 'Profile'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
