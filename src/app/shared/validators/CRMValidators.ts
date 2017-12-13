import {FormControl} from "@angular/forms";

export class CRMValidators {



  static getEmailRegexp() {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  static email(control: FormControl) {
    const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (control.value != "" && (control.value.length < 5 || !emailRegexp.test(control.value))) {
      return {invalidEmail: true}
    }
    return null;
  }

  static phone(control: FormControl) {
    const phoneRegexp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (control.value !== null && (control.value.length < 8 || !phoneRegexp.test(control.value))) {
      return {invalidPhone: true}
    }
    return null;
  }

  static zipcode(control: FormControl) {
    const zipcodeRegexp = /(^\d{4}$)|(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if (control.value !== null && control.value.length > 0 && (control.value.length < 4 || !zipcodeRegexp.test(control.value))) {
      return {invalidZipcode: true}
    }
    return null;
  }

  static leterOrDigitsOnly(control: FormControl) {
    const regexp = /^\w+$/;
    if (control.value.length > 0 && !regexp.test(control.value)) {
      return {invalidNickname: true}
    }
    return null;
  }
}
