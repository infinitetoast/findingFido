import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonComponent } from './person-signup/person-signup.component';
import { PetComponent } from './pet-signup/pet-signup.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PetDashboardComponent } from './pet-dashboard/pet-dashboard.component';
import { ReviewComponent } from './review/review.component';
import { PetBooleanComponent } from './pet-boolean/pet-boolean.component';
import { ChatComponent } from './chat/chat.component';
import { PageNotFoundComponent } from './page-not-found'


const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'person-signup', component: PersonComponent },
  { path: 'pet-signup', component: PetComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'pet-dashboard', component: PetDashboardComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'pet-boolean', component: PetBooleanComponent },
  { path: 'chat', component: ChatComponent },
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
