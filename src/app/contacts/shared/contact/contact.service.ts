import {Injectable} from "@angular/core";
import {AuthHttp} from "../../../core/auth/auth-http.service";
import {Contact} from "../contact.model";


@Injectable()
export class ContactService {

  constructor(private http: AuthHttp) {
  }

  createContact(contact: Contact) {
    return this.http.post('/api/v1/contacts/create', JSON.stringify(contact))
  }

  updateContact(contact: Contact) {
    return this.http.put('/api/v1/contacts/update/' + contact.id, JSON.stringify(contact))
  }

  // deleteContact(id: number) {
  //   return this.http.delete('/api/v1/contacts/delete/' + id)
  // }

}
