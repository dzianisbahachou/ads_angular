import { Injectable } from '@angular/core';
import {catchError, of, Subject, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserLogin} from "../interfaces/auth.interface";
import {environment} from "../../../environments/environment.template";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public error$:Subject<any> = new Subject<any>()
  public userName:string = ''

  constructor(private http:HttpClient) {}

  get token() {
    // @ts-ignore
    const expiresDate= new Date(localStorage.getItem('expires'))
    if (new Date > expiresDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user:UserLogin) {
    user.returnSecureToken = true
    return this.http
      .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap((data:any) => {
          this.userName = data.email.split('@')[0]
        }),
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  register(user:any) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
      .pipe(
      catchError(this.handleError.bind(this))
    )
  }

  handleError(error:any) {
    const {message} = error.error.error;
    switch (message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        this.error$.next('Please, enter existing credentials')
        break
      case 'EMAIL_EXISTS':
        this.error$.next('Email is already exist')
        break
    }
    return throwError(error)
  }

  logout():any {
    this.setToken(null)
  }

  isAuthenticated():boolean {
    return !!this.token
  }

  setToken(response:any):void {
    if (response) {
      const expiresDate:Date = new Date(new Date().getTime() + +response?.expiresIn * 1000)
      localStorage.setItem('fb-token', response?.idToken)
      localStorage.setItem('expires', expiresDate.toString())
    } else {
      localStorage.clear()
    }
  }


}
