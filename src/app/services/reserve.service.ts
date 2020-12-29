import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingDetails } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  private bookingDetails = new BookingDetails(undefined, { name: '', _id: '' }, '', 'lunch', '')
  private dinnerTimeSlot: string[]
  private lunchTimeSlot: string[]
  private locations!: { name: string, _id: string }[]
  cuisines: any[]
  locationsSubject = new Subject<[{ name: string, _id: string }]>()

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const bookingString = localStorage.getItem('Booking')
    if (bookingString) {
      this.bookingDetails = JSON.parse(bookingString)
    }
    this.bookingDetails.session = 'lunch'
    this.lunchTimeSlot = ['12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30']
    this.dinnerTimeSlot = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30']
    this.locations = []
    this.cuisines = []
    this.getLocationsFromServer()
  }

  getBookingDetails(): BookingDetails {
    return { ...this.bookingDetails }
  }

  getLunchTimeSlots(): string[] {
    return this.lunchTimeSlot.slice()
  }

  getDinnerTimeSlots(): string[] {
    return this.dinnerTimeSlot.slice()
  }

  getBookingValidity(): boolean {

    return !!this.bookingDetails.location && !!this.bookingDetails.guests && !!this.bookingDetails.date && !!this.bookingDetails.session && !!this.bookingDetails.timeslot
  }

  getLocations() {
    return this.locations.slice()
  }

  setBookingDetails(bookingDetails: BookingDetails) {
    this.bookingDetails = bookingDetails
    this.bookingDetails.total = (this.bookingDetails.guests || 0) * 500
    localStorage.setItem('Booking', JSON.stringify(this.bookingDetails))
    this.getBookingValidity()
  }

  getLocationsFromServer(): void {
    this.http.get<[{ name: string, _id: string }]>(environment.SERVER_URL + 'server/locations')
      .subscribe(res => {
        console.log('location received');

        this.locations = res
        this.locationsSubject.next(res)
      })
  }
  getCuisines() {
    return this.http.get<any[]>(environment.SERVER_URL + 'server/cuisines')
      .pipe(tap(res => {
        this.cuisines = res
      }))
  }
  routeToReserve(locationId: string) {
    const location = this.locations.find(location => location._id === locationId)
    if (location !== undefined) {
      this.bookingDetails.location = location
    }
    this.setBookingDetails(this.bookingDetails)
    this.router.navigate(['/', 'home', 'reserve'])
  }
}
