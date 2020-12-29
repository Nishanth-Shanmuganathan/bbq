import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
  }

  close() {
    this.sidenav.close();
  }
}
