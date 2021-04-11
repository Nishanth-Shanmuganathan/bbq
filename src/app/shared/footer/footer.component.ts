import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private router: Router, private authService: AuthService) {
    this.matIconRegistry.addSvgIcon(
      "fb",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./../../../assets/icons/facebook.svg")
    );
  }

  ngOnInit(): void {
  }

  adminRoute() {
    let user = this.authService.user
    if (typeof user === 'string') {
      user = JSON.parse(user)
    }
    console.log(user.isAdmin);

    if (user.isAdmin) {
      this.router.navigate(['/', 'home', 'admin'])
    }
  }
}
