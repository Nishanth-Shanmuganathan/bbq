import { ReserveService } from './../../services/reserve.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  @Input() small: boolean
  @Input() dish!: {
    name: string,
    imageUrl: string,
    location: {
      address: string[],
      _id: string
    }
  }
  constructor(
    private reserveService: ReserveService
  ) {
    this.small = true;
  }

  ngOnInit(): void {
  }

  routeToReserve(locationId: string) {
    this.reserveService.routeToReserve(locationId)
  }
}
