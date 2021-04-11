import { Router } from '@angular/router';
import { UIService } from './../../services/ui.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  showLoginPassword: boolean
  loginForm!: FormGroup;
  submitted: boolean
  isLoading: boolean
  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private router: Router
  ) {
    this.showLoginPassword = false
    this.submitted = false
    this.isLoading = false
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('admin@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('admins', [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
    })
  }

  login() {
    this.submitted = true
    if (this.loginForm.invalid) { return }
    this.authService.login(this.loginForm.value)
      .subscribe(res => {
        this.router.navigate(['/'])
        this.submitted = false
      }, err => {
        this.submitted = false
        this.uiService.notify(err.error.error.error || 'Login failed...')
      })
  }

}
