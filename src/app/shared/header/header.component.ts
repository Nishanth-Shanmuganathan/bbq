import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter()

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
  }

  emit() {
    this.toggleEvent.emit()
  }
}
