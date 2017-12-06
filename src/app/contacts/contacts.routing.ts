import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ContactsComponent} from "./contacts.component";

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    data: { title: 'Contacts' }
  },
  {
    path: ':userId',
    component: ContactsComponent,
    data: { title: 'Contacts' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {

}
