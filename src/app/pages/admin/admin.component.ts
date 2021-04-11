import { UIService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  city!: string
  isCityLoading!: boolean;
  isLoading!: boolean;
  cities!: any[]
  dishes!: any[]
  offers!: any[]
  availableLocations: any[]

  cityMode!: boolean
  dishMode!: boolean
  offerMode!: boolean

  constructor(
    private dataService: DataService,
    private reserveService: ReserveService,
    private uiService: UIService
  ) {
    this.offerMode = false
    this.dishMode = false
    this.cityMode = false
    this.isLoading = true
    this.isCityLoading = false
    this.dishes = this.dataService.dishes
    this.isLoading = !this.dishes.length
    this.cities = []
    this.availableLocations = this.reserveService.getLocations()
    this.city = this.availableLocations.length ? this.availableLocations[0] : []
  }

  ngOnInit(): void {
    if (!this.dishes.length) {
      this.isLoading = true
      this.dataService.todayDishes()
        .subscribe(res => {
          this.dishes = res
          this.isLoading = false
        })
      this.reserveService.locationsSubject.subscribe(res => {
        this.availableLocations = res
        this.city = this.availableLocations[0]
      })
    }
  }
  searchCity(search: any) {
    const searchString = search.target?.value as string
    if (!searchString) {
      this.cities = this.availableLocations
    }
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
          console.log(res);

        })
    }
  }

  addDish(data: { location: string, name: string, imageUrl: string }) {
    this.dataService.addNewDish(data)
      .subscribe(res => {
        this.dishMode = false
        this.dishes.push(res)
      }, err => {
        console.log(err);
        this.uiService.notify('Unable to add data...')
      })
  }
  addOffers(data: { desc: string, name: string, imageUrl: string, isSeasonal: boolean, validTill: Date }) {
    this.dataService.addNewOffer(data)
      .subscribe(res => {
        this.offerMode = false
        this.offers.push(res)
      }, err => {
        console.log(err);
        this.uiService.notify('Unable to add data...')
      })
  }

  addLocation(data: { name: string, address: string[] }) {
    this.dataService.addNewLocation(data)
      .subscribe(res => {
        this.cityMode = false
        this.cities.push(res)
        this.reserveService.locationsSubject.next(this.cities)
      }, err => {
        console.log(err);
        this.uiService.notify('Unable to add data...')
      })
  }

  changeMode(mode: string) {
    this.dishMode = mode === 'dish' && !this.dishMode
    this.offerMode = mode === 'offer' && !this.offerMode
    this.cityMode = mode === 'city' && !this.cityMode
  }
}
