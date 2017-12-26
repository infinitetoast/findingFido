import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PageNotFoundComponent } from './page-not-found'


const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'schedule', component: ScheduleComponent },
  // {
  //   path: '',
  //   redirectTo: '/',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )

  ],
  exports: [
    RouterModule]
})
export class AppRoutingModule { }

/*Here is the first configuration. Pass the array of routes, appRoutes, to the RouterModule.forRoot method.
It returns a module, containing the configured Router service provider, plus other providers that the routing library requires.
Once the application is bootstrapped, the Router performs the initial navigation based on the current browser URL.*/
