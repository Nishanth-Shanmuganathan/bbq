import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-dish-card',
  templateUrl: './add-dish-card.component.html',
  styleUrls: ['./add-dish-card.component.css']
})
export class AddDishCardComponent implements OnInit {
  @Input() locations: any[] = []
  @Output() add = new EventEmitter<{ name: string, location: string, imageUrl: string }>()
  dishDetails!: FormGroup

  constructor() {
    console.log(this.locations);

  }

  ngOnInit(): void {
    this.dishDetails = new FormGroup({
      name: new FormControl('', [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
    })
  }

  emitData() {
    if (this.dishDetails.invalid) { return }
    this.add.emit(this.dishDetails.value)
  }
}
