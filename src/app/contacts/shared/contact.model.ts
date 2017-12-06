import {Group} from "./group.model";
import {Address} from "./address.model";
import {Phone} from "./phone.model";
import {Email} from "./email.model";

export interface Contact {
  name: string
  address: Address
  phones: Phone[]
  emails: Email[]
  groups: Group[]
  groupIds?: number[]
  jobPosition?: string
  contactsBookId?: number
  fax?: string
  skypeId?: string
  company?: string
  language?: string
  timeZone?: string
  note?: string
  advertiserId?: number
  id?: number
}
