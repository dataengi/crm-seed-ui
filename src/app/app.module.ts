import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {AppComponent} from "./app.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppRoutingModule} from "./app.routing";
import {SidebarComponent} from "./layouts/main-layout/sidebar.component";
import {CoreModule} from "./core/core.module";
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";
import {EmptyLayoutComponent} from "./layouts/empty-layout/empty-layout.component";
import {DropdownDirective} from "./layouts/main-layout/dropdown.directive";
import {AsideComponent} from "./layouts/main-layout/aside.component";
import {PageNotFoundComponent} from "./layouts/pages/page-not-found/page-not-found.component";
import {MainLayoutService} from "./layouts/main-layout/main-layout.service";
import {TabsModule} from "ngx-bootstrap/tabs";
import {HeaderComponent} from "./layouts/main-layout/header.component";
import {BreadcrumbsComponent} from "./layouts/layouts-utils/breadcrumb.component";
import {NAV_DROPDOWN_DIRECTIVES} from "./layouts/layouts-utils/nav-dropdown.directive";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "./layouts/layouts-utils/sidebar.directive";
import {AsideToggleDirective} from "./layouts/layouts-utils/aside.directive";
import {ModalModule} from "ngx-bootstrap/modal";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {KeycloakAngularModule} from "keycloak-angular";

const LocationStrategyProvider = {provide: LocationStrategy, useClass: HashLocationStrategy};

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    CoreModule.forRoot()
  ],
  declarations: [
    AppComponent,
    BreadcrumbsComponent,
    //Directives
    NAV_DROPDOWN_DIRECTIVES,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    SidebarComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    DropdownDirective,
    AsideComponent,
    PageNotFoundComponent,
    HeaderComponent
  ],
  providers: [
    MainLayoutService,
    LocationStrategyProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
