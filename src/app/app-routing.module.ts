import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginModalComponent} from "./shared/components/login-modal/login-modal.component";

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/', pathMatch: "full"},
    {path: '', component: HomePageComponent, children: [
        {path: 'login', component: LoginModalComponent},
        {path: 'register', component: LoginModalComponent},
      ]},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
