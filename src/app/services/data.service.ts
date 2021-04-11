import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dishes: any[]
  offers: any[]
  seasonalOffers: any[]
  constructor(
    private http: HttpClient
  ) {
    this.dishes = []
    this.offers = []
    this.seasonalOffers = []
  }

  todayDishes() {
    return this.http.get<any[]>(environment.SERVER_URL + 'server/dishes')
      .pipe(tap(res => {
        this.dishes = res
      }))
  }

  todayDishesOfSelectedCity(city: any) {
    return this.http.post<any[]>(environment.SERVER_URL + 'server/dishes', city)
  }

  getOffersFromServer() {
    return this.http.get<{ seasonalOffers: any[], offers: any[] }>(environment.SERVER_URL + 'server/offers')
      .pipe(tap(res => {
        this.seasonalOffers = res.seasonalOffers
        this.offers = res.offers
      }))
  }

  addNewDish(dish: any) {
    return this.http.post<{}>(environment.SERVER_URL + 'server/dish', dish)
  }
  addNewOffer(offer: any) {
    return this.http.post<{}>(environment.SERVER_URL + 'server/offer', offer)
  }
  addNewLocation(city: any) {
    return this.http.post<{}>(environment.SERVER_URL + 'server/location', city)
  }
}
