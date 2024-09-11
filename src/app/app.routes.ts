import { Routes } from '@angular/router';
import { ROUTES_UI } from './constants';
import { LoginComponent } from './Components/userAuth/login/login.component';
import { canActivate, canActivateLogin } from './services/auth.guard';
import { RegisterComponent } from './Components/userAuth/register/register.component';
import { OtpTestComponent } from './Components/userAuth/otp-test/otp-test.component';
import { WheelOfFortuneComponent } from './Components/wheel-of-fortune/wheel-of-fortune.component';

export const routes: Routes = [
  { path: ROUTES_UI.DEFAULT, pathMatch: 'full', redirectTo: ROUTES_UI.LOGIN },
  {
    path: ROUTES_UI.LOGIN,
    component: LoginComponent,
    canActivate: [canActivateLogin],
  },
  {
    path: ROUTES_UI.REGISTER,
    component: RegisterComponent,
    canActivate: [canActivateLogin],
  },
  {
    path: ROUTES_UI.OTP_TEST,
    component: OtpTestComponent,
    canActivate: [canActivateLogin],
  },
  {
    path: ROUTES_UI.WHEEL_OF_FORTUNE,
    component: WheelOfFortuneComponent,
    canActivate: [canActivate],
  }
];
