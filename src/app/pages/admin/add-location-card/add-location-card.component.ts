import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-location-card',
  templateUrl: './add-location-card.component.html',
  styleUrls: ['./add-location-card.component.css']
})
export class AddLocationCardComponent implements OnInit {
  @Output() add = new EventEmitter<{ name: string, address: string[] }>()
  locationDetails!: FormGroup

  constructor() {
  }

  ngOnInit(): void {
    this.locationDetails = new FormGroup({
      name: new FormControl('Kanya Kumari', [Validators.required]),
      street: new FormControl('10. Thirumagaal Street', [Validators.required]),
      area: new FormControl('Muttam', [Validators.required]),
      city: new FormControl('Kanya Kumari', [Validators.required]),
      state: new FormControl('Tamil Nadu', [Validators.required]),
    })
  }

  emitData() {
    if (this.locationDetails.invalid) { return }
    const address = [this.locationDetails.value.street, this.locationDetails.value.area, this.locationDetails.value.city, this.locationDetails.value.state]

    this.add.emit({ name: this.locationDetails.value.name, address })

  }
}
