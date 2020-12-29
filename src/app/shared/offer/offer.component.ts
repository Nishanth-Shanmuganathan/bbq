import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  @Input() offer!: {
    name: string,
    desc: string,
    imageUrl: string,
    _id: string,
    validTill: string
  }
  constructor() { }

  ngOnInit(): void {
  }

}
