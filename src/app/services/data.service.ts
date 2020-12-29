import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dishes: any[]
  constructor(
    private http: HttpClient
  ) {
    this.dishes = []
  }

  todayDishes() {
    return this.http.get<any[]>(environment.SERVER_URL + 'server/dishes')
      .pipe(tap(res => {
        this.dishes = res
      }))
  }
}
