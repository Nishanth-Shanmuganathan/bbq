import { ReserveService } from './../../services/reserve.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  city!: string
  isCityLoading!: boolean;
  cities!: any[]
  dishes: any[]
  availableLocations: any[]
  isLoading: boolean
  constructor(
    private dataService: DataService,
    private reserveService: ReserveService
  ) {
    this.isLoading = true
    this.dishes = this.dataService.dishes
    this.isLoading = !this.dishes.length
    this.availableLocations = this.reserveService.getLocations()
  }

  ngOnInit(): void {
    if (!this.dishes.length) {
      this.isLoading = true
      this.dataService.todayDishes()
        .subscribe(res => {
          console.log('dish received');
          this.dishes = res
          this.isLoading = false
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
  }

  validateCity(city: string) {
    if (!city) {
      this.dishes = this.dataService.dishes
    }
    if (this.cities.includes(city)) {
      this.city = city
      this.dataService.todayDishesOfSelectedCity(this.city)
        .subscribe(res => {
          this.dishes = res
        })
    }
  }
}
