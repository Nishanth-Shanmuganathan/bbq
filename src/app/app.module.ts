import { AuthInterceptor } from './services/auth.interceptor';
import { AuthGuard } from './services/auth.gaurd';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { AppMaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingComponent } from './pages/landing/landing.component';
import { TodayComponent } from './pages/today/today.component';
import { DishComponent } from './shared/dish/dish.component';
import { OfferComponent } from './shared/offer/offer.component';
import { SpecialOffersComponent } from './pages/special-offers/special-offers.component';
import { ReserveComponent } from './pages/reserve/reserve.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NotificationComponent,
    LandingComponent,
    TodayComponent,
    DishComponent,
    OfferComponent,
    SpecialOffersComponent,
    ReserveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
