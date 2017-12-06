import {NgModule} from "@angular/core";
import {ContactService} from "./contact.service";
import {ContactComponent} from "./contact.component";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ContactComponent
  ],
  providers: [
    ContactService
  ],
  exports: [
    ContactComponent
  ]
})
export class ContactModule {
}
