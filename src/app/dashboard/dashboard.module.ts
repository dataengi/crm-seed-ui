import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard.routing";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [
  ],
  declarations: [
    DashboardComponent,
  ]
})
export class DashboardModule {
}
