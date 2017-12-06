import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {InvitesService} from "./invites.service";
import {NotificationsService} from "../../core/notifications/notifications.service";
import {Company} from "../../core/models/auth/company.model";

@Component({
  selector: 'crm-create-company',
  templateUrl: './create-company.component.html',
  styles: []
})
export class CreateCompanyComponent implements OnInit {

  @Output() newCompany = new EventEmitter<Company>();
  companyName: string;

  constructor(public activeModal: NgbActiveModal,
              private invitesService: InvitesService,
              private ns: NotificationsService) {
  }

  create() {
    this.invitesService.createCompany(new Company(this.companyName)).subscribe(
      (company: Company) => {
        this.newCompany.emit(company);
        this.activeModal.close();
        this.ns.success("Company created");
      },
      error => {
        console.log(error);
      }
    )
  }

  cancel() {
    this.activeModal.close();
  }

  disabledCreate() {
    return this.companyName.length === 0;
  }

  ngOnInit() {
  }

}
