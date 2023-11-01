import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { LoginModalComponent } from './shared/components/login-modal/login-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./shared/services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {authReducer} from "./store/reducers/auth.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainLayoutComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({auth: authReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true
    }),
    EffectsModule.forRoot([])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
