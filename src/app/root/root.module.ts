import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {CompaniesComponent} from "./companies/companies.component";
import {CompanyComponent} from "./companies/company/company.component";
import {CompaniesService} from "./companies/companies.service";
import {RootRoutingModule} from "./root.routing";
import {CompanyService} from "./companies/company/company.service";

@NgModule({
  imports: [
    SharedModule,
    RootRoutingModule
  ],
  declarations: [
    CompaniesComponent,
    CompanyComponent
  ],
  providers: [
    CompaniesService,
    CompanyService
  ]
})
export class RootModule {
}
