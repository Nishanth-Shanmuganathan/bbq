import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.css']
})
export class SpecialOffersComponent implements OnInit {
  seasonalOffers!: any[]
  offers!: any[]
  isLoading: boolean
  constructor(
    private dataService: DataService
  ) {
    this.offers = this.dataService.offers
    this.seasonalOffers = this.dataService.seasonalOffers
    this.isLoading = !this.offers.length || !this.seasonalOffers.length
  }

  ngOnInit(): void {
    if (!this.offers.length || !this.seasonalOffers.length) {
      this.isLoading = true
      this.dataService.getOffersFromServer()
        .subscribe(res => {
          this.isLoading = false
          console.log('offers received');
          this.seasonalOffers = res.seasonalOffers
          this.offers = res.offers
        }, err => {
          console.log(err);
        })
    }
  }

}
