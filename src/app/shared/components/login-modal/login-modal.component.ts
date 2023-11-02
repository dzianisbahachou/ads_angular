import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserLogin} from "../../interfaces/auth.interface";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Observable, tap} from "rxjs";
import {authSelector} from "../../../store/selectors/auth.selector";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit{
  form:any
  submitted:boolean = false
  isAuth$:Observable<string>;
  isAuth: string | undefined

  constructor(public auth:AuthService, private router:Router, private store:Store) {
    this.isAuth$ = this.store.pipe(select(authSelector))
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
    this.isAuth$.subscribe(data => {
      this.isAuth = data
    })
  }


  loginSubmit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const user:UserLogin = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    this.auth.login(user).subscribe(data => {
      this.form.reset()
      this.submitted = false
      this.router.navigate([''])
    }, () => {
      this.submitted = false
    })
  }
}
