import { ReserveComponent } from './pages/reserve/reserve.component';
import { SpecialOffersComponent } from './pages/special-offers/special-offers.component';
import { TodayComponent } from './pages/today/today.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthGuard } from './services/auth.gaurd';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: "prefix",
        component: LandingComponent
      },
      {
        path: 'reserve',
        component: ReserveComponent
      },
      {
        path: 'today-specials',
        component: TodayComponent
      },
      {
        path: 'offers',
        component: SpecialOffersComponent
      },
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
