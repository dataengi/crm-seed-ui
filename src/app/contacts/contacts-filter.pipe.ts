import {Pipe, PipeTransform} from '@angular/core';
import {Contact} from "./shared/contact.model";

@Pipe({
  name: 'contactsFilter',
  pure: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], contactsFilterData: ContactsFilterData): Contact[] {
    let filteredContacts = contacts.filter(contact => this.check(contact, contactsFilterData));
    return this.orderBy(filteredContacts, contactsFilterData);
  }

  private check(contact: Contact, contactsFilterData: ContactsFilterData) {
    let byGroupId = contactsFilterData.groupId ? contact.groups && contact.groups.some(group => group.id === contactsFilterData.groupId) : true;

    function byId() {
      return contactsFilterData.isId() ? contact.id === contactsFilterData.id : true
    }

    function byName() {
      return contactsFilterData.isName() ? contact.name.toLowerCase().search(contactsFilterData.name.toLowerCase()) >= 0 : true
    }

    function byCompany() {
      return contactsFilterData.isCompany() ? contact.company.toLowerCase().search(contactsFilterData.company.toLowerCase()) >= 0 : true
    }

    function byEmail() {
      return contactsFilterData.isEmail() ? contact.emails.some(email => email.email.search(contactsFilterData.email.toLowerCase()) >= 0) : true
    }

    function byPhone() {
      return contactsFilterData.isPhone() ? contact.phones.some(phone => phone.phone.search(contactsFilterData.phone.toLowerCase()) >= 0) : true
    }

    return byGroupId && byId() && byName() && byCompany() && byEmail() && byPhone()
  }


  private orderBy(contacts: Contact[], contactsFilterData: ContactsFilterData) {
    let sorted: Contact[] = [];

    switch (contactsFilterData.orderBy) {
      case ContactOrderByField.Id:
        sorted = contacts.sort((a, b) => a.id > b.id ? 1 : -1);
        break;
      case ContactOrderByField.Name:
        sorted = contacts.sort((a, b) => a.name > b.name ? 1 : -1);
        break;
      case ContactOrderByField.Company:
        sorted = contacts.sort((a, b) => a.company > b.company ? 1 : -1);
        break;
    }

    return contactsFilterData.orderASC ? sorted : sorted.reverse()
  }
}

export class ContactsFilterData {

  id: number = null;
  name: string = '';
  company: string = '';
  email: string = '';
  phone: string = '';

  groupId: number = null;

  orderBy: ContactOrderByField = ContactOrderByField.Id;
  orderASC: boolean = true;

  isId() {
    return !!this.id
  }

  isName() {
    return !!this.name && this.name.length > 0
  }

  isCompany() {
    return !!this.company && this.company.length > 0
  }

  isEmail() {
    return !!this.email && this.email.length > 0
  }

  isPhone() {
    return !!this.phone && this.phone.length > 0
  }

  filterByGroup(groupId: number) {
    this.groupId = groupId;
  }

  cleanGroupFilter() {
    this.groupId = null;
  }

  orderById() {
    if (this.isOrderedById()) {
      this.orderASC = !this.orderASC;
    } else {
      this.orderASC = true;
      this.orderBy = ContactOrderByField.Id;
    }
  }

  isOrderedById() {
    return this.orderBy === ContactOrderByField.Id
  }

  orderByName() {
    if (this.isOrderedByName()) {
      this.orderASC = !this.orderASC;
    } else {
      this.orderASC = true;
      this.orderBy = ContactOrderByField.Name;
    }
  }

  isOrderedByName() {
    return this.orderBy === ContactOrderByField.Name
  }

  orderByCompany() {
    if (this.isOrderedByCompany()) {
      this.orderASC = !this.orderASC;
    } else {
      this.orderASC = true;
      this.orderBy = ContactOrderByField.Company;
    }
  }

  isOrderedByCompany() {
    return this.orderBy === ContactOrderByField.Company
  }

  cleanSearchFields() {
    this.id = null;
    this.name = '';
    this.company = '';
    this.email = '';
    this.phone = '';
  }

}

enum ContactOrderByField {
  Id,
  Name,
  Company
}
