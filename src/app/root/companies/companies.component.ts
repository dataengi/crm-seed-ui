import { Component, OnInit } from '@angular/core';
import {CompaniesService} from "./companies.service";
import {Company} from "../../core/models/auth/company.model";

@Component({
  selector: 'crm-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  companies: Company[] = [];

  constructor(private companiesService: CompaniesService) { }

  ngOnInit() {
    this.companiesService.getCompaniesList()
      .subscribe(
        companies => this.companies = companies,
        error => console.log(error)
    )
  }

}
