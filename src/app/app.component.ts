import {Component} from "@angular/core";

@Component({
  selector: 'body',
  template: `
    <router-outlet></router-outlet>
    <crm-notifications></crm-notifications>
    `
})
export class AppComponent {
  constructor() {
  }
}
