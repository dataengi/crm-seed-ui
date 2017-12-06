import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'crm-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent {

  @Input() control: FormControl;
  @Input() errors: {name: string, message: string}[] = [];

  constructor() { }

}
