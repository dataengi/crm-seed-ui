import {Injectable} from "@angular/core";
import {AuthHttp} from "../core/auth/auth-http.service";
import {
  CreateGroupData, AddContactsToGroupData, UpdateGroupData, RemoveContactsData,
  RemoveContactsFromGroupData
} from "./contacts.data";
import {Contact} from "./shared/contact.model";

@Injectable()
export class ContactsService {

  constructor(private http: AuthHttp) {
  }

  getContactsBook() {
    return this.http.get('/api/v1/contacts/contactsbook/owner')
  }

  getContactsBookByUserId(userId: number) {
    return this.http.get('/api/v1/contacts/contactsbook/owner/' + userId);
  }

  deleteContact(id: number) {
    return this.http.delete('/api/v1/contacts/delete/' + id)
  }

  deleteContacts(data: RemoveContactsData) {
    return this.http.post('/api/v1/contacts/delete', JSON.stringify(data))
  }

  deleteGroup(id: number) {
    return this.http.delete('/api/v1/contacts/group/delete/' + id)
  }

  createGroup(group: CreateGroupData) {
    return this.http.post('/api/v1/contacts/group/create', JSON.stringify(group))
  }

  updateGroup(data: UpdateGroupData) {
    return this.http.post('/api/v1/contacts/group/update', JSON.stringify(data))
  }

  addContactsToGroup(data: AddContactsToGroupData) {
    return this.http.post('/api/v1/contacts/group/add', JSON.stringify(data))
  }

  deleteContactFromGroup(data: RemoveContactsFromGroupData) {
    return this.http.post('/api/v1/contacts/group/delete', JSON.stringify(data))
  }
}
