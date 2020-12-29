import { ReserveService } from './../../services/reserve.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  cityName!: string
  isCityLoading!: boolean;
  cities!: string[]
  dishes: any[]
  availableLocations: any[]

  constructor(
    private dataService: DataService,
    private reserveService: ReserveService
  ) {
    this.dishes = this.dataService.dishes
    this.availableLocations = this.reserveService.getLocations()
  }

  ngOnInit(): void {
    if (!this.dishes.length) {
      this.dataService.todayDishes()
        .subscribe(res => {
          this.dishes = res
        })
      this.reserveService.locationsSubject.subscribe(res => {
        this.availableLocations = res
      })
    }
  }
  searchCity(search: any) {
    const searchString = search.target?.value as string
    if (!searchString) { return }
    this.isCityLoading = true
    if (!this.availableLocations.length) {
      this.reserveService.getLocationsFromServer()
    }
    this.cities = this.availableLocations.filter(location => location.name.toLowerCase().startsWith(searchString.toLowerCase()))
    console.log(this.cities);
    this.isCityLoading = false
    // this.dataService.searchCity(search)
    //   .subscribe(res => {
    //     this.cities = res
    //     this.isCityLoading = false
    //   })
  }

  validateCity(city: string) {
    if (this.cities.includes(city)) {
      this.cityName = city
      //   this.dataService.fetchHotelInCity(this.cityName)
      //   this.isHotelLoading.next(true)
      //   this.cityName = ''
      // } else {
      //   this.cityName = ''
    }
  }
}
