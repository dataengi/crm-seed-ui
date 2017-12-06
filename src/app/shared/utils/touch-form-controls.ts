import {AbstractControl, FormArray, FormControl, FormGroup} from "@angular/forms";

export class TouchFormControls {

  static touch(control: AbstractControl) {
    if (control instanceof FormControl) {
      control.markAsTouched()
    } else {
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(key => TouchFormControls.touch(control.controls[key]))
      } else {
        if (control instanceof FormArray) {
          control.controls.forEach(c => TouchFormControls.touch(c))
        }
      }
    }
  }
}
