import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + this.authService.token
      }
    })
    return next.handle(modifiedReq)
      .pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            if (event.body['user']) {
              console.log('User: ', event.body['user']);
              this.authService.userSubj.next(event.body['user'])
              localStorage.setItem('user', JSON.stringify(event.body['user']))
              if (this.authService.token !== event.body['user']['token']) {
                this.authService.token = event.body['user']['token']
                this.authService.tokenSubj.next(event.body['user']['token'])
                localStorage.setItem('token', event.body['user']['token'])
              }
            }
          }
          return event
        })
      )
  }
}
