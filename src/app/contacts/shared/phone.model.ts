import {PhoneType} from "./phone-type.type";

export interface Phone {
  phoneType: PhoneType
  phone: string
  id?: number
}
