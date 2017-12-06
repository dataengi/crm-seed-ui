import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {InvitesComponent} from "./invites/invites.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/invites',
    data: {
      title: 'Admin'
    },
    pathMatch: 'full'
  },
  {
    path: 'invites',
    component: InvitesComponent,
    data: {
      title: 'Invites'
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      title: 'Users'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
