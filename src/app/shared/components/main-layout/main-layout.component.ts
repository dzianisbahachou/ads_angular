import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";
import {signIn} from "../../../store/actions/auth.action";
import {select, Store} from "@ngrx/store";
import {Observable, tap} from "rxjs";
import {authSelector} from "../../../store/selectors/auth.selector";
import {initialAuthState} from "../../../store/reducers/auth.reducer";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent{
  isSignIn$:Observable<string>;

  constructor(public auth: AuthService, private store:Store) {
    this.isSignIn$ = this.store.pipe(select(authSelector))
  }

  signIn() {
    this.store.dispatch(signIn())
  }

}
