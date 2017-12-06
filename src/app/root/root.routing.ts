import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {CompaniesComponent} from "./companies/companies.component";
import {CompanyComponent} from "./companies/company/company.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'companies'
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    data: {title: 'Companies list'}
  },
  {
    path: 'company/:id',
    component: CompanyComponent,
    data: {title: 'Company'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootRoutingModule {
}
