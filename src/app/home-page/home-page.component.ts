import { Component } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Store} from "@ngrx/store";
import {signUp} from "../store/actions/auth.action";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(private auth:AuthService, private store:Store) {}


  signUp() {
    this.store.dispatch(signUp())
  }
}
