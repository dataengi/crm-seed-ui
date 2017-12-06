import {Component} from "@angular/core";
import {CompanyProfilesService} from "./core/profile/company-profiles.service";

@Component({
  selector: 'body',
  template: `
    <router-outlet></router-outlet>
    <crm-notifications></crm-notifications>
    `
})
export class AppComponent {
  constructor(private companyProfilesService: CompanyProfilesService) {
  }
}
