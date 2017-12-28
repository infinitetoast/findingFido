import { Routes, RouterModule, CanActivate } from '@angular/router';

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
import { PageNotFoundComponent } from './page-not-found';
import { AuthGuard } from './auth/auth.gard';


const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'person-signup', component: PersonComponent, canActivate: [AuthGuard] },
  { path: 'pet-signup', component: PetComponent, canActivate: [AuthGuard] },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
  { path: 'pet-dashboard', component: PetDashboardComponent, canActivate: [AuthGuard] },
  { path: 'review', component: ReviewComponent, canActivate: [AuthGuard] },
  { path: 'pet-boolean', component: PetBooleanComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
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
  providers: [AuthGuard],
  exports: [
    RouterModule]
})
export class AppRoutingModule { }

/*Here is the first configuration. Pass the array of routes, appRoutes, to the RouterModule.forRoot method.
It returns a module, containing the configured Router service provider, plus other providers that the routing library requires.
Once the application is bootstrapped, the Router performs the initial navigation based on the current browser URL.*/
