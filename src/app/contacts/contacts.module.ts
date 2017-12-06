import {NgModule} from "@angular/core";
import {ContactsRoutingModule} from "./contacts.routing";
import {SharedModule} from "../shared/shared.module";
import {ContactsComponent} from "./contacts.component";
import {GroupsComponent} from "./groups/groups.component";
import {ContactsService} from "./contacts.service";
import {ContactModule} from "./shared/contact/contact.module";
import {ContactComponent} from "./shared/contact/contact.component";
import {ContactsFilterPipe} from "./contacts-filter.pipe";


@NgModule({
  declarations: [
    ContactsComponent,
    GroupsComponent,
    ContactsFilterPipe,
  ],
  imports: [
    SharedModule,
    ContactsRoutingModule,
    ContactModule
  ],
  entryComponents: [
    ContactComponent
  ],
  providers: [
    ContactsService
  ]
})
export class ContactsModule {
}
