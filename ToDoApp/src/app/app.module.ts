import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ItemsComponent } from './Components/Item/items/items.component';
import { ItemFormComponent } from './Components/Item/item-form/item-form.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { AuthenticationGuardService } from './Services/auth-guard.service';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemFormComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'dashboard',
        component: ItemsComponent,
        canActivate: [AuthenticationGuardService],
        children: [
          {
            path: 'payment',
            component: ItemFormComponent,
            canActivate: [AuthenticationGuardService],
          },
        ],
      },
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:44379'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [AuthenticationGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
