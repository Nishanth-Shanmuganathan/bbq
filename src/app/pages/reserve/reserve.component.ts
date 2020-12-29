import { ReserveService } from './../../services/reserve.service';
import { Component, OnInit } from '@angular/core';
import { BookingDetails } from 'src/app/models/booking.model';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
  isLoading!: boolean
  data: any = []
  mobileBookingTableVisibility!: boolean
  mobile!: boolean
  now: Date
  booking: BookingDetails
  availableLocations!: { name: string, _id: string }[]
  availableTimeslots!: string[]

  constructor(
    private reserveService: ReserveService
  ) {
    this.now = new Date()
    this.booking = this.reserveService.getBookingDetails()
    this.availableLocations = this.reserveService.getLocations()
    this.mobileBookingTableVisibility = false
    // this.data = [
    //   {
    //     dish: 'Soup',
    //     sub: [
    //       {
    //         dish: 'All is well potato leek soup',
    //         sub: []
    //       }
    //     ]
    //   },
    //   {
    //     dish: 'Salad',
    //     sub: [
    //       {
    //         dish: 'Rangeela russian salad',
    //         sub: []
    //       },
    //       {
    //         dish: 'Angrezi salad',
    //         sub: []
    //       },
    //       {
    //         dish: 'Coleslaw salad',
    //         sub: []
    //       },
    //       {
    //         dish: 'Cocktail pasta salad',
    //         sub: []
    //       },
    //       {
    //         dish: 'Bombay fruit salad',
    //         sub: []
    //       }
    //     ]
    //   },
    //   {
    //     dish: 'Starter',
    //     sub: [
    //       {
    //         dish: 'Gabbar canjun spice potato',
    //         sub: []
    //       },
    //       {
    //         dish: 'Disco shammi kebab',
    //         sub: []
    //       },
    //       {
    //         dish: 'Super star crispy corn',
    //         sub: []
    //       },
    //       {
    //         dish: 'Ishq wala pineapple',
    //         sub: []
    //       },
    //       {
    //         dish: 'Dabang mushroom',
    //         sub: []
    //       },
    //       {
    //         dish: 'Mastani panner tikka',
    //         sub: []
    //       },
    //       {
    //         dish: 'Beetroot in a stick',
    //         sub: []
    //       },
    //       {
    //         dish: 'Dilwale roasted potato',
    //         sub: []
    //       }

    //     ]
    //   },
    //   {
    //     dish: 'Main course',
    //     sub: [
    //       {
    //         dish: 'VEG AU-GRATIN',
    //         sub: []
    //       },
    //       {
    //         dish: 'DHAMAAL VEG DUM BIRYANI',
    //         sub: []
    //       },
    //       {
    //         dish: 'GULABO PLAIN RICE',
    //         sub: []
    //       },
    //       {
    //         dish: 'BAJIRAO VEG KOLHAPURI',
    //         sub: []
    //       },
    //       {
    //         dish: 'BADE MIYAN SHAHI PANNER',
    //         sub: []
    //       },
    //       {
    //         dish: 'MAJNU CHILLI PANEER',
    //         sub: []
    //       },
    //       {
    //         dish: 'CHANDINI CHOWK TO CHINA',
    //         sub: []
    //       },
    //     ]
    //   },
    //   {
    //     dish: 'Kulfi',
    //     sub: []
    //   },
    //   {
    //     dish: 'Dessert',
    //     sub: []
    //   }
    // ]
  }

  ngOnInit(): void {
    this.validatePlatform()
    this.sessionChange('lunch')
    this.reserveService.locationsSubject.subscribe(res => {
      this.availableLocations = res
    })
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
    this.booking.location = this.availableLocations.find(ele => ele._id === _id)

    this.updateBookingDetails()
  }

  updateBookingDetails() {
    this.reserveService.setBookingDetails(this.booking)
  }

  bookingValid(): boolean {
    return this.reserveService.getBookingValidity()
  }
}
