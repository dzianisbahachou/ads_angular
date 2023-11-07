import {AfterContentInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserLogin} from "../../interfaces/auth.interface";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Observable, tap} from "rxjs";
import {authSelector} from "../../../store/selectors/auth.selector";
import {signIn} from "../../../store/actions/auth.action";

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

  constructor(
    public auth:AuthService,
    private router:Router,
    private store:Store,
    private route:ActivatedRoute
  ) {
    this.isAuth$ = this.store.pipe(select(authSelector))
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
    this.isAuth$.subscribe(data => {
      if (!data) {
        // @ts-ignore
        const path = this.route.url.value[0].path;
        if (path === 'login') {
          this.isAuth = 'SIGN_IN'
        } else {
          this.isAuth = 'SIGH_UP'
        }
      } else {
        this.isAuth = data
      }
    })
  }


  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const user:UserLogin = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    if (this.isAuth === 'SIGN_IN') {
      this.login(user)
    } else {
      this.register(user)
    }
  }

  login(user:any) {
    this.auth.login(user).subscribe(data => {
      this.form.reset()
      this.submitted = false
      this.router.navigate([''])
    }, () => {
      this.submitted = false
    })
  }

  register(user:any) {
    this.auth.register(user).subscribe(data => {
      this.form.reset()
      this.submitted = false
      alert('You have been sign up')
      this.store.dispatch(signIn())
      this.router.navigate(['/login'])
    }, () => {
      this.submitted = false
    })
  }

  onExit() {
    this.router.navigate(['/'])
  }


}
