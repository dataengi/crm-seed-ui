import {EmailType} from "./email-type.type";

export interface Email {
  emailType: EmailType
  email: string
  id?: number
}
