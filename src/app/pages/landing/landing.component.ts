import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BookingDetails } from 'src/app/models/booking.model';
import { Hotel } from 'src/app/models/hotel.model';
import { HomeService } from './../../services/home.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css', './ad-card.component.css', './special-offers.components.css']
})
export class LandingComponent implements OnInit {
  now: Date
  newHotel: Hotel
  topTodaySpecial: any[]
  specialOffers: any[]
  booking: BookingDetails
  availableLocations!: { name: string, _id: string }[]
  availableTimeslots!: string[]
  isLoading: boolean

  constructor(
    private homeService: HomeService,
    private router: Router
  ) {
    this.now = new Date()
    this.isLoading = true
    this.newHotel = this.homeService.newHotel
    this.topTodaySpecial = this.homeService.topTodaySpecial
    this.specialOffers = this.homeService.specialOffers
    this.isLoading = !this.newHotel && !this.topTodaySpecial.length && !this.specialOffers.length
    this.booking = this.homeService.reserveService.getBookingDetails()
    this.availableLocations = this.homeService.reserveService.getLocations()
  }

  ngOnInit(): void {
    this.sessionChange(this.booking.session)

    this.homeService.reserveService.locationsSubject.subscribe(res => {
      this.availableLocations = res
    })


    if (!this.newHotel || !this.specialOffers.length || !this.topTodaySpecial.length) {
      this.isLoading = true
      this.homeService.homePageData()
        .subscribe(res => {
          console.log('land received');

          this.isLoading = false
          this.newHotel = res.newHotel
          this.topTodaySpecial = res.topTodaySpecial
          this.specialOffers = res.specialOffers
        }, err => {
          console.log(err);
        })
    }
  }

  sessionChange(session: string) {
    if (this.booking.session !== session) {
      this.booking.session = session
      this.booking.timeslot = ''
      this.updateBookingDetails()
    }
    if (session === 'lunch') {
      this.availableTimeslots = this.homeService.reserveService.getLunchTimeSlots()
    } else {
      this.availableTimeslots = this.homeService.reserveService.getDinnerTimeSlots()
    }
  }

  timeslotChange(timeslot: string) {
    this.booking.timeslot = timeslot
    this.updateBookingDetails()
  }

  updateLocation(_id: string) {
    this.booking.location = this.availableLocations.find(ele => ele._id === _id)
    this.updateBookingDetails()
  }

  updateBookingDetails() {
    this.homeService.reserveService.setBookingDetails(this.booking)
  }

  bookingValid(): boolean {
    return this.homeService.reserveService.getBookingValidity()
  }

  routeToReserve(locationId: string) {
    this.homeService.reserveService.routeToReserve(locationId)
  }
}
