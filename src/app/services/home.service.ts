import { tap } from 'rxjs/operators';
import { ReserveService } from './reserve.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  newHotel: any
  specialOffers!: any[]
  topTodaySpecial!: any[]


  constructor(
    private http: HttpClient,
    public reserveService: ReserveService
  ) {
    this.newHotel = undefined
    this.specialOffers = []
    this.topTodaySpecial = []
  }


  homePageData() {
    return this.http.get<{ topTodaySpecial: any[], newHotel: any, specialOffers: any[] }>(environment.SERVER_URL + 'server/home')
      .pipe(tap(res => {
        this.newHotel = res.newHotel
        this.specialOffers = res.specialOffers
        this.topTodaySpecial = res.topTodaySpecial
      }))
  }


}
