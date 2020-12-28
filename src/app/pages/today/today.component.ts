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
  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
  }
  searchCity(search: any) {
    const searchString = search.target?.value as string
    if (!searchString) { return }
    this.isCityLoading = true

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
