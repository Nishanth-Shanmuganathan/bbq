import { MatSidenav } from '@angular/material/sidenav';
import { ReserveService } from './../../services/reserve.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingDetails } from 'src/app/models/booking.model';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
  isLoading!: boolean
  cuisines: any = []
  mobileBookingTableVisibility!: boolean
  mobile!: boolean
  now: Date
  booking: BookingDetails
  availableLocations!: { name: string, _id: string }[]
  availableTimeslots!: string[]
  @ViewChild('sidenav') sidenav!: MatSidenav
  constructor(
    private reserveService: ReserveService
  ) {
    this.now = new Date()
    this.booking = this.reserveService.getBookingDetails()
    this.availableLocations = this.reserveService.getLocations()
    this.mobileBookingTableVisibility = false
    this.cuisines = this.reserveService.cuisines
    this.isLoading = !this.cuisines
  }

  ngOnInit(): void {
    this.validatePlatform()
    this.sessionChange('lunch')
    this.reserveService.locationsSubject.subscribe(res => {
      this.availableLocations = res
    })
    if (!this.cuisines.length) {
      this.isLoading = true
      this.reserveService.getCuisines()
        .subscribe(res => {
          this.isLoading = false
          this.cuisines = res
        })
    }
  }


  validatePlatform() {
    this.mobile = window.innerWidth < 768
    if (!this.mobile) {
      this.mobileBookingTableVisibility = false
    }
  }


  sessionChange(session: string) {
    if (this.booking.session !== session) {
      this.booking.session = session
      this.booking.timeslot = ''
      this.updateBookingDetails()
    }
    if (session === 'lunch') {
      this.availableTimeslots = this.reserveService.getLunchTimeSlots()
    } else {
      this.availableTimeslots = this.reserveService.getDinnerTimeSlots()
    }
  }

  timeslotChange(timeslot: string) {
    this.booking.timeslot = timeslot
    this.updateBookingDetails()
  }

  updateLocation(_id: string) {
    const location = this.availableLocations.find(ele => ele._id === _id)
    if (location !== undefined) {
      this.booking.location = location
    }
    this.updateBookingDetails()
  }

  updateBookingDetails() {
    this.reserveService.setBookingDetails(this.booking)
  }

  bookingValid(): boolean {
    return this.reserveService.getBookingValidity()
  }

  proceedBooking() {
    console.log(this.booking);
    this.sidenav.open()
  }
}
