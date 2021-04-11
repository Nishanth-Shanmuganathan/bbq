import { ReserveService } from './../../../services/reserve.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatExpansionPanelDescription } from '@angular/material/expansion';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css']
})
export class BookingCardComponent implements OnInit {
  @Input() booking: any
  location: any
  isOpened: boolean
  constructor(
    private reserveService: ReserveService
  ) {
    this.isOpened = false
  }

  ngOnInit(): void {
    this.reserveService.getLocationDetails(this.booking.location)
      .subscribe(res => {
        console.log(res);
        this.location = res
      }, err => {
        console.log(err);

      })
  }
  open(hide: MatExpansionPanelDescription, show: MatExpansionPanelDescription) {
    console.log(hide);
    console.log(show);

  }
}
