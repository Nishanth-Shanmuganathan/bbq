import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-offer-card',
  templateUrl: './add-offer-card.component.html',
  styleUrls: ['./add-offer-card.component.css']
})
export class AddOfferCardComponent implements OnInit {
  @Output() add = new EventEmitter<{ desc: string, name: string, imageUrl: string, isSeasonal: boolean, validTill: Date }>()
  offerDetails!: FormGroup
  monthLater: Date
  constructor() {
    this.monthLater = new Date(Date.now() + (60 * 60 * 24 * 1000 * 30))
  }

  ngOnInit(): void {
    this.offerDetails = new FormGroup({
      name: new FormControl('Pongal Offer', [Validators.required]),
      desc: new FormControl('Grab Pongal Offers 2021 On Amazon, Flipkart, Snapdeal, & Myntra. Special Sankranti Festive Coupons & Deals', [Validators.required]),
      imageUrl: new FormControl('https://static.toiimg.com/thumb/msid-67512385,imgsize-353206,width-800,height-600,resizemode-75/67512385.jpg', [Validators.required]),
      validTill: new FormControl(null),
      isSeasonal: new FormControl(false)
    })
  }

  emitData() {
    if (this.offerDetails.invalid) { return }
    this.add.emit(this.offerDetails.value)
  }
}
