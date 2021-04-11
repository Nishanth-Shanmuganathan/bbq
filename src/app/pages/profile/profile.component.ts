import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user
  constructor(
    private authService: AuthService
  ) {
    this.user = this.authService.user
    console.log(this.user);

  }

  ngOnInit(): void {
    this.authService.userSubj.subscribe(res => {
      this.user = res
      console.log(this.user);
    })
  }

  logout() {
    this.authService.logout()
  }

}
