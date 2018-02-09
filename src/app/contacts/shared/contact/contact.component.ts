import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from "@angular/core";
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ContactService} from "./contact.service";
import {GroupSelectItem} from "../../contacts.data";
import {CRMValidators} from "../../../shared/validators/CRMValidators";
import {NotificationsService} from "../../../core/notifications/notifications.service";
import {ContactFormState} from "./contact-form-state.enum";
import {Contact} from "../contact.model";
import {Group} from "../group.model";
import {Email} from "../email.model";
import {Phone} from "../phone.model";
import {Address} from "../address.model";

@Component({
  selector: 'crm-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  @Input() state: ContactFormState = ContactFormState.New;
  @Input() contact: Contact;
  @Input() groups: Group[] = [];
  @Input() isOwner: boolean = true;
  @Output() newContactEvent = new EventEmitter<Contact>();
  @Output() editContactEvent = new EventEmitter<Contact>();

  emailTypes = ['Work', 'Home', 'Other'];
  phoneTypes = ['Work', 'Home', 'Mobile', 'Other'];
  groupsItems: GroupSelectItem[] = [];
  selectedGroupItems: GroupSelectItem[] = [];

  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal,
              private contactService: ContactService,
              private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.formInit();
    this.groupsItems = this.fillGroupsItems(this.groups);
    if(this.contact){
      this.selectedGroupItems = this.fillGroupsItems(this.contact.groups);
    }
  }

  ngOnDestroy() {
  }

  isForm(): boolean {
    return this.state !== ContactFormState.Detail;
  };

  isEdit(): boolean {
    return this.state === ContactFormState.Edit;
  }

  isNew(): boolean {
    return this.state === ContactFormState.New;
  }

  isDetail(): boolean {
    return this.state === ContactFormState.Detail;
  }

  showDelete(fields: any[]): boolean {
    return this.isForm() && fields.length > 1;
  }

  close() {
    this.activeModal.close();
  }

  toEdit() {
    this.state = ContactFormState.Edit;
  }

  onSubmit() {
    this.contactForm.controls['emails'].value[0].emailType = 'Main'; //todo rewrite temp
    this.contactForm.controls['phones'].value[0].phoneType = 'Main'; //todo rewrite temp
    let newContact: Contact = this.contactForm.value;
    if (newContact.company === null) newContact.company = '';
    this.contactService.createContact(newContact).subscribe(
      (contact: Contact) => {
        this.contact = contact;
        this.contact.groups = [];
        this.newContactEvent.emit(this.contact);
        this.state = ContactFormState.Detail;
        this.formInit();
        this.notificationsService.success('Contact created');
        this.activeModal.close();
      },
      error => {
        this.notificationsService.error(error.error)
      }
    );
  }

  onSave() {
    this.contactForm.controls['emails'].value[0].emailType = 'Main'; //todo rewrite temp
    this.contactForm.controls['phones'].value[0].phoneType = 'Main'; //todo rewrite temp
    let contact: Contact = this.contactForm.value;
    contact.id = this.contact.id;
    contact.contactsBookId = this.contact.contactsBookId;

    this.contactService.updateContact(contact).subscribe(
      (contact:Contact) => {
        contact.groups = this.contactForm.controls['groupIds'].value.map(id => this.getGroupById(id));
        this.contact.groups.length = 0;
        this.contact.groups.push(...contact.groups);
        this.editContactEvent.emit(contact);
        this.state = ContactFormState.Detail;
        this.notificationsService.success('Contact updated');
        this.activeModal.close();
      },
      error => {
        this.notificationsService.error(error.error);
      }
    )
  }

  addEmailField() {
    this.emails.push(this.initEmail());
  }

  deleteEmailField(index: number) {
    this.emails.removeAt(index);
  }

  addPhoneField() {
    this.phones.push(this.initPhone());
  }

  deletePhoneField(index: number) {
    this.phones.removeAt(index);
  }

  get emails(): FormArray {
    return this.contactForm.get('emails') as FormArray;
  }

  get phones(): FormArray {
    return this.contactForm.get('phones') as FormArray;
  }

  get address(): FormGroup {
    return this.contactForm.get('address') as FormGroup
  }

  private formInit() {

    if (this.isNew() || typeof this.contact === 'undefined') {
      this.contactForm = this.formBuilder.group({
        name: [null, [Validators.required, Validators.maxLength(50)]],
        company: [null, [Validators.maxLength(50)]],
        address: this.initAddress(),
        emails: this.formBuilder.array([this.initEmail()]),
        phones: this.formBuilder.array([this.initPhone()]),
        skypeId: [null, [Validators.maxLength(20)]],
        fax: [null, [Validators.maxLength(20)]],
        jobPosition: [null, [Validators.maxLength(20)]],
        language: [null, [Validators.maxLength(15)]],
        timeZone: [null, [Validators.maxLength(20)]],
        note: [null, []],
        advertiserId: [null],
        groupIds: this.formBuilder.array([])
      });
    } else {
      this.contactForm = this.formBuilder.group({
        name: [this.contact.name, [Validators.required, Validators.maxLength(50)]],
        company: [this.contact.company, [Validators.maxLength(50)]],
        address: this.initAddress(this.contact.address),
        emails: this.formBuilder.array(this.contact.emails.map(email => this.initEmail(email))),
        phones: this.formBuilder.array(this.contact.phones.map(phone => this.initPhone(phone))),
        skypeId: [this.contact.skypeId, [Validators.maxLength(20)]],
        fax: [this.contact.fax, [Validators.maxLength(20)]],
        jobPosition: [this.contact.jobPosition, [Validators.maxLength(20)]],
        language: [this.contact.language, [Validators.maxLength(15)]],
        timeZone: [this.contact.timeZone, [Validators.maxLength(20)]],
        note: [this.contact.note, []],
        advertiserId: [this.contact.advertiserId],
        groupIds: this.formBuilder.array(this.contact.groups.map(group => this.formBuilder.control(group.id)))
      });
    }

  }

  private initEmail(email?: Email) {
    if (email) {
      return this.formBuilder.group({
        emailType: [email.emailType, [Validators.required]],
        email: [email.email, [Validators.required, CRMValidators.email]]
      })
    } else {
      return this.formBuilder.group({
        emailType: [this.emailTypes[0], [Validators.required]],
        email: ['', [Validators.required, CRMValidators.email]]
      })
    }
  }

  private initPhone(phone?: Phone) {
    if (phone) {
      return this.formBuilder.group({
        phoneType: [phone.phoneType, [Validators.required]],
        phone: [phone.phone, [Validators.required, CRMValidators.phone]]
      })
    } else {
      return this.formBuilder.group({
        phoneType: [this.phoneTypes[0], [Validators.required]],
        phone: [null, [Validators.required, CRMValidators.phone]]
      })
    }
  }

  private initAddress(address?: Address) {
    if (address) {
      return this.formBuilder.group({
        id: [address.id],
        street: [address.street, [Validators.maxLength(50)]],
        state: [address.state, [Validators.maxLength(50)]],
        country: [address.country, [Validators.maxLength(50)]],
        city: [address.city, [Validators.maxLength(50)]],
        zipCode: [address.zipCode, [CRMValidators.zipcode]]
      })
    } else {
      return this.formBuilder.group({
        id: [null],
        street: [null, [Validators.maxLength(50)]],
        state: [null, [Validators.maxLength(50)]],
        country: [null, [Validators.maxLength(50)]],
        city: [null, [Validators.maxLength(50)]],
        zipCode: [null, [CRMValidators.zipcode]]
      })
    }
  }

  private fillGroupsItems(groups: Group[]) {
    return groups.map(group => new GroupSelectItem(group))
  }


  onAddGroup(item) {
    if(typeof item.id === 'string') {
      (<FormArray>this.contactForm.controls['groupIds']).push(this.formBuilder.control(0))
    } else {
      (<FormArray>this.contactForm.controls['groupIds']).push(this.formBuilder.control(item.id))
    }
  }

  onRemoveGroup(item) {
    if (typeof item.id === 'string') {
      (<FormArray>this.contactForm.controls['groupIds']).removeAt(this.contactForm.controls['groupIds'].value.indexOf(0))
    } else {
      (<FormArray>this.contactForm.controls['groupIds']).removeAt(this.contactForm.controls['groupIds'].value.indexOf(item.id))
    }
  }

  private getGroupById(id: number) {
    return this.groups.find(group => group.id === id);
  }

  fieldTooLongError = {name: 'maxlength', message: 'Too long'}
}
