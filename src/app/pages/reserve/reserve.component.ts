import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ReserveComponent implements OnInit {
  isLoading!: boolean
  data: any
  mobileBookingTableVisibility!: boolean
  mobile!: boolean
  constructor() {
    this.mobileBookingTableVisibility = false
    this.data = [
      {
        dish: 'Soup',
        sub: [
          {
            dish: 'All is well potato leek soup',
            sub: []
          }
        ]
      },
      {
        dish: 'Salad',
        sub: [
          {
            dish: 'Rangeela russian salad',
            sub: []
          },
          {
            dish: 'Angrezi salad',
            sub: []
          },
          {
            dish: 'Coleslaw salad',
            sub: []
          },
          {
            dish: 'Cocktail pasta salad',
            sub: []
          },
          {
            dish: 'Bombay fruit salad',
            sub: []
          }
        ]
      },
      {
        dish: 'Starter',
        sub: [
          {
            dish: 'Gabbar canjun spice potato',
            sub: []
          },
          {
            dish: 'Disco shammi kebab',
            sub: []
          },
          {
            dish: 'Super star crispy corn',
            sub: []
          },
          {
            dish: 'Ishq wala pineapple',
            sub: []
          },
          {
            dish: 'Dabang mushroom',
            sub: []
          },
          {
            dish: 'Mastani panner tikka',
            sub: []
          },
          {
            dish: 'Beetroot in a stick',
            sub: []
          },
          {
            dish: 'Dilwale roasted potato',
            sub: []
          }

        ]
      },
      {
        dish: 'Main course',
        sub: [
          {
            dish: 'VEG AU-GRATIN',
            sub: []
          },
          {
            dish: 'DHAMAAL VEG DUM BIRYANI',
            sub: []
          },
          {
            dish: 'GULABO PLAIN RICE',
            sub: []
          },
          {
            dish: 'BAJIRAO VEG KOLHAPURI',
            sub: []
          },
          {
            dish: 'BADE MIYAN SHAHI PANNER',
            sub: []
          },
          {
            dish: 'MAJNU CHILLI PANEER',
            sub: []
          },
          {
            dish: 'CHANDINI CHOWK TO CHINA',
            sub: []
          },
        ]
      },
      {
        dish: 'Kulfi',
        sub: []
      },
      {
        dish: 'Dessert',
        sub: []
      }
    ]
  }

  ngOnInit(): void {
    this.validatePlatform()
  }
  validatePlatform() {
    this.mobile = window.innerWidth < 768
    if (!this.mobile) {
      this.mobileBookingTableVisibility = false
    }
  }
}
