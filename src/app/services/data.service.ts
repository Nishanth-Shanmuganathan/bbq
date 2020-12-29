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

  getOffersFromServer() {
    return this.http.get<{ seasonalOffers: any[], offers: any[] }>(environment.SERVER_URL + 'server/offers')
      .pipe(tap(res => {
        this.seasonalOffers = res.seasonalOffers
        this.offers = res.offers
      }))
  }
}
