import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Invite} from "./invite.model";
import {InvitesService} from "./invites.service";
import {Subscription} from "rxjs";
import {NotificationsService} from "../../core/notifications/notifications.service";

import {AuthService} from "../../core/auth/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateCompanyComponent} from "./create-company.component";

import {PermissionsService} from "../../core/auth/permissions.service";
import {CRMValidators} from "../../shared/validators/CRMValidators";
import {SpinnerService} from "../../core/spinner/spinner.service";
import {Actions} from "../../core/models/auth/action.type";
import {Role} from "../../core/models/auth/role.model";
import {Company} from "../../core/models/auth/company.model";

@Component({
  selector: 'crm-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.scss']
})
export class InvitesComponent implements OnInit, OnDestroy {

  inviteForm: FormGroup;

  private invitesSubscription: Subscription;
  private createInviteSubscription: Subscription;
  private rolesSubscription: Subscription;
  private companiesSubscription: Subscription;
  private userStateSubscription: Subscription;
  isAllowCreateCompany: boolean = false;

  roles: Role[] = [];
  invites: Invite[] = [];
  companies: Company[] = [];

  constructor(private formBuilder: FormBuilder,
              private invitesService: InvitesService,
              private notifications: NotificationsService,
              private authService: AuthService,
              private modalService: NgbModal,
              public ps: PermissionsService,
              private spinner: SpinnerService) {
  }

  setIsAllowCreateCompany() {
    this.isAllowCreateCompany = this.ps.isAllow(Actions.CreateCompany)
  }

  createCompany() {
    const modalRef = this.modalService.open(CreateCompanyComponent);
    modalRef.componentInstance.newCompany.subscribe((company: Company) => this.companies.push(company));
  }

  onSubmit() {
    this.spinner.show();
    let formValue = this.inviteForm.value;
    formValue.roleId = parseInt(this.inviteForm.value.roleId);
    formValue.companyId = parseInt(this.inviteForm.value.companyId);
    this.initForm();
    this.createInviteSubscription = this.invitesService.createInvite(formValue)
      .map(resp => resp.json())
      .subscribe(
        (ok: Invite) => {
          ok.company = this.getCompaniesById()[ok.companyId];
          this.invites.unshift(ok);
          this.notifications.success("Invite created");
          this.spinner.hide();
        },
        error => {
          this.notifications.error(error.json());
          this.spinner.hide();
        }
      )
  }

  onClean() {
    this.initForm();
  }

  ngOnInit() {
    this.setIsAllowCreateCompany();
    this.initForm();

    this.userStateSubscription = this.authService.userState.subscribe(user => {
      if (this.isAllowCreateCompany !== this.ps.isAllow(Actions.CreateCompany)) {
        this.setIsAllowCreateCompany();
        this.initForm();
      }
    });

    this.subscribeInvites();

    this.rolesSubscription = this.invitesService.getRoles().subscribe(
      roles => this.roles = roles,
      error => console.log(error)
    );
  }

  subscribeInvites() {
    console.log("isAllowCreateCompany " + this.isAllowCreateCompany);

    this.invitesSubscription = (this.isAllowCreateCompany ? this.invitesService.getInvites() :
      this.invitesService.getInvitesByCompany())
      .subscribe(
        invites => {
          if (this.isAllowCreateCompany) {
            this.subscribeCompanies(() => this.decorateInvitesWithCompany(invites));
          } else {
            this.invites = invites;
          }
        },
        error => console.log(error)
    );
  }

  decorateInvitesWithCompany(invites: Invite[]) {
    let companiesById = this.getCompaniesById();
    invites.forEach(i => i.company = companiesById[i.companyId]);
    this.invites = invites;
  }

  getCompaniesById(): {[id: number]: Company} {
    let companiesById: {[id: number]: Company} = {};
    this.companies.forEach(c => companiesById[c.id] = c);
    return companiesById;
  }

  subscribeCompanies(onDone: () => any) {
    this.companiesSubscription = this.invitesService.getCompanies().subscribe(
      companies => {
        this.companies = companies;
        onDone();
      },
      error => console.log(error)
    );
  }

  ngOnDestroy() {
    this.invitesSubscription.unsubscribe();
    this.rolesSubscription.unsubscribe();

    if (this.companiesSubscription) {
      this.companiesSubscription.unsubscribe()
    }

    if (this.createInviteSubscription) {
      this.createInviteSubscription.unsubscribe();
    }
  }

  private companyIdInitValue(): string {
    if (this.isAllowCreateCompany) {
      return ''
    } else {
      return this.authService.getUser().company.id.toString()
    }
  }

  private initForm() {
    this.inviteForm = this.formBuilder.group({
      email: ['', [Validators.required, CRMValidators.email]],
      roleId: ['', Validators.required],
      companyId: [this.companyIdInitValue(), Validators.required]
    })
  }

}
