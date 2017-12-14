import {Component, OnInit, OnDestroy} from "@angular/core";
import {NgbModalOptions, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ContactsService} from "./contacts.service";
import {NotificationsService} from "../core/notifications/notifications.service";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Subscription} from "rxjs";
import {AddContactsToGroupData, RemoveContactsData, RemoveContactsFromGroupData} from "./contacts.data";
import {ActivatedRoute} from "@angular/router";
import {ContactComponent} from "./shared/contact/contact.component";
import {Contact} from "./shared/contact.model";
import {Group} from "./shared/group.model";
import {ContactFormState} from "./shared/contact/contact-form-state.enum";
import {ContactsBook} from "./shared/contacts-book.model";
import {ConfirmDialogService} from "../core/confirm-dialog/confirm-dialog.service";
import {ContactsFilterData} from "./contacts-filter.pipe";

@Component({
  selector: 'crm-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {

  searchGroupForm: FormGroup;
  private searchGroupSubscription: Subscription;

  isOwner: boolean = true;
  contactsOwnerEmail: string = '';

  contacts: Contact[] = [];
  groups: Group[] = [];
  contactsBookId: number;

  selectedContactsIds: number[] = [];
  selectedGroup: Group;
  filteredGroups: Group[] = [];

  newState = ContactFormState.New;
  editState = ContactFormState.Edit;
  detailState = ContactFormState.Detail;

  showGroups: boolean = false;

  contactsFilterData = new ContactsFilterData();

  isShowFilters: boolean = false;

  constructor(private modalService: NgbModal,
              private contactsService: ContactsService,
              private notificationsService: NotificationsService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private confirmDialogService: ConfirmDialogService) {
  }

  ngOnInit() {
    this.searchGroupFormInit();

    let getContactsBook;
    if (this.route.snapshot.params.hasOwnProperty('userId')) {
      getContactsBook = this.contactsService.getContactsBookByUserId(+this.route.snapshot.params['userId']);
      this.isOwner = false;
      this.contactsOwnerEmail = this.route.snapshot.queryParams['email'];
    } else {
      getContactsBook = this.contactsService.getContactsBook()
    }

    getContactsBook.subscribe(
      (book: ContactsBook) => {
        this.contacts = book.contacts;
        this.groups = book.groups;
        this.contactsBookId = book.id;
      },
      error => this.notificationsService.error(error)
    );

  }

  ngOnDestroy() {
  }

  onSelectChange(event, contactId: number) {
    if (event.target.checked) {
      this.selectedContactsIds.push(contactId)
    } else {
      this.selectedContactsIds.splice(this.selectedContactsIds.indexOf(contactId), 1)
    }
  }

  isSelected(contactId: number): boolean {
    return this.selectedContactsIds.indexOf(contactId) !== -1;
  }

  isSomeSelected() {
    return this.selectedContactsIds.length > 0;
  }

  selectAll(event) {
    if (event.target.checked) {
      this.selectedContactsIds = [];
      this.selectedContactsIds.push(...this.contacts.map(c => c.id));
    } else {
      this.selectedContactsIds = [];
    }
  }

  openContact(state: ContactFormState, event: Event, contact?: Contact) {
    event.stopPropagation();
    const options: NgbModalOptions = {size: 'lg'};
    const modalRef = this.modalService.open(ContactComponent, options);
    modalRef.componentInstance.state = state;
    modalRef.componentInstance.contact = contact;
    modalRef.componentInstance.groups = this.groups;
    modalRef.componentInstance.isOwner = this.isOwner;
    modalRef.componentInstance.newContactEvent.subscribe(contact => this.addContact(contact));
    modalRef.componentInstance.editContactEvent.subscribe(contact => this.editContact(contact));
  }

  deleteContact(contact: Contact, event: Event) {
    event.stopPropagation();
    this.confirmDialogService.ask('You really want delete contact?', 'Delete', 'Delete contact confirmation').then(
      ()=> {
        this.contactsService.deleteContact(contact.id).subscribe(
          ()=> {
            this.contacts.splice(this.contacts.indexOf(contact), 1);
            this.notificationsService.success('Contact deleted');
          },
          error => this.notificationsService.error(error)
        )
      },
      cancel => console.debug('Cancel')
    );
  }

  private addContact(contact: Contact) {
    this.contacts.push(contact);
  }

  private editContact(contact: Contact) {
    let oldContact = this.contacts.find(c => c.id === contact.id);
    this.contacts[this.contacts.indexOf(oldContact)] = contact;
  }

  switchGroup() {
    this.showGroups = !this.showGroups
  }

  addGroup(group: Group) {
    this.groups.push(group)
  }

  editGroup({id, name}) {
    this.groups.forEach((item) => {
      if (item.id === id) {
        item.name = name;
        return;
      }
    });
  }

  deleteGroup(id: number) {
    this.groups.forEach((item, index, arr) => {
      if (item.id === id) {
        arr.splice(index, 1);
        return;
      }
    });
  }

  private searchGroupFormInit() {
    this.searchGroupForm = this.formBuilder.group({
      group: ['']
    });

    this.searchGroupSubscription = this.searchGroupForm.valueChanges.debounceTime(200).subscribe(formValue => {
      this.filterGroup(formValue.group)
    });
  }

  onDeleteSelectedContacts() {
    this.confirmDialogService.ask('You really want delete contacts?', 'Delete', 'Delete contacts confirmation').then(
      ()=> {
        this.contactsService.deleteContacts(new RemoveContactsData(this.selectedContactsIds)).subscribe(
          ()=> {
            this.selectedContactsIds.forEach(id => {
              let contact = this.contacts.find(c => c.id === id);
              this.contacts.splice(this.contacts.indexOf(contact), 1);
            });
            this.selectedContactsIds = [];
            this.notificationsService.success('Contacts deleted');
          },
          error => {
            this.notificationsService.error(error)
          }
        );
      },
      cancel => console.debug('cancel')
    )
  }

  onAddToGroup() {
    this.searchGroupFormInit();
    this.filteredGroups = [];
    this.filteredGroups.push(...this.groups.slice(0, 10))
  }

  private filterGroup(text: string) {
    this.filteredGroups = [];
    this.filteredGroups.push(...this.groups.filter(group => group.name.toLowerCase().startsWith(text.toLowerCase())).slice(0, 10))
  }

  addSelectedToGroup(groupId: number) {
    this.contactsService.addContactsToGroup(new AddContactsToGroupData(groupId, this.selectedContactsIds)).subscribe(
      ()=> {
        const group = this.groups.find(g => g.id === groupId);
        this.contacts.forEach(contact => {
          if (this.selectedContactsIds.indexOf(contact.id) !== -1) {
            contact.groups.push(group);
          }
        });
        this.selectedContactsIds = [];
        this.notificationsService.success('Contacts added to group');
      },
      error => {
        this.notificationsService.error(error)
      }
    )
  }

  filterByGroup(group: Group) {
    this.selectedGroup = group;
    this.contactsFilterData.filterByGroup(group.id)
  }

  showAll() {
    this.selectedGroup = null;
    this.contactsFilterData.cleanGroupFilter();
  }

  onRemoveContactFromGroup(contact: Contact, event: Event) {
    event.stopPropagation();
    this.contactsService.deleteContactFromGroup(new RemoveContactsFromGroupData(this.selectedGroup.id, [contact.id]))
      .subscribe(
        ()=> {
          this.contacts[this.contacts.indexOf(contact)].groups.splice(contact.groups.indexOf(this.selectedGroup), 1);
          this.notificationsService.success('Contact removed from group');
          },
          error => {
          this.notificationsService.error(error)
        }
      )
  }

  caretClass() {
    return this.contactsFilterData.orderASC ? 'fa-caret-down' : 'fa-caret-up'
  }

  toggleShowFilter() {
    this.contactsFilterData.cleanSearchFields();
    this.isShowFilters = !this.isShowFilters
  }

}
