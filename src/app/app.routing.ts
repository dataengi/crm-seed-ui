import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CompaniesManagementGuard, LoggedInOnly} from "./core/auth/auth-guard";
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";
import {EmptyLayoutComponent} from "./layouts/empty-layout/empty-layout.component";
import {PageNotFoundComponent} from "./layouts/pages/page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full',
  },
  {
    path: '', component: MainLayoutComponent, data: {title: 'Home'},
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [LoggedInOnly]
      },
      {
        path: 'contacts',
        loadChildren: './contacts/contacts.module#ContactsModule',
        canActivate: [LoggedInOnly]
      },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canActivate: [LoggedInOnly],
        data: {title: 'Admin'}
      },
      {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule',
        canActivate: [LoggedInOnly]
      },
      {
        path: 'root',
        loadChildren: './root/root.module#RootModule',
        canActivate: [LoggedInOnly],
        data: {title: 'Global Admin'},
      }
    ]
  },
  // {
  //   path: 'auth', component: EmptyLayoutComponent, data: {title: 'Auth'},
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: './auth/auth.module#AuthModule',
  //       data: {title: 'Auth'}
  //     },
  //   ]
  // },
  {
    path: '**', component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
