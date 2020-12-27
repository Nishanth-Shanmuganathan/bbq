import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = localStorage.getItem('token')
  user = localStorage.getItem('user')
  tokenSubj = new BehaviorSubject<string | null>(this.token)
  userSubj = new BehaviorSubject<string | null>(this.user)

  constructor(
    private http: HttpClient
  ) { }

  login(data: any) {
    return this.http.post<{ message: string }>(environment.SERVER_URL + 'auth/login', data)
  }
  register(data: any) {
    return this.http.post<{ message: string }>(environment.SERVER_URL + 'auth/register', data)
  }

}
