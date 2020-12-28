import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bbq';
  @ViewChild('sidenav')
  sidenav!: MatSidenav

  reason = '';

  ngOnInit() { }

}
