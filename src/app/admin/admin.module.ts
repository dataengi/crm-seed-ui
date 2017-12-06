import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin.routing";
import {InvitesComponent} from "./invites/invites.component";
import {UsersComponent} from "./users/users.component";
import {InvitesListComponent} from "./invites/invites-list.component";
import {SharedModule} from "../shared/shared.module";
import {InvitesService} from "./invites/invites.service";
import {CreateCompanyComponent} from "./invites/create-company.component";
import {UsersService} from "./users/users.service";

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  providers: [
    InvitesService,
    UsersService
  ],
  declarations: [
    AdminComponent,
    InvitesComponent,
    UsersComponent,
    InvitesListComponent,
    CreateCompanyComponent
  ],
  entryComponents: [
    CreateCompanyComponent
  ]
})
export class AdminModule {
}
