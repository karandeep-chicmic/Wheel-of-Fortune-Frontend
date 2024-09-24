import { Routes } from '@angular/router';
import { ROUTES_UI } from './constants';
import { LoginComponent } from './Components/userAuth/login/login.component';
import {
  canActivate,
  canActivateAdmin,
  canActivateLogin,
} from './services/auth.guard';
import { RegisterComponent } from './Components/userAuth/register/register.component';
import { OtpTestComponent } from './Components/userAuth/otp-test/otp-test.component';
import { WheelOfFortuneComponent } from './Components/wheelComponents/wheel-of-fortune/wheel-of-fortune.component';
import { WheelListingPageComponent } from './Components/wheelComponents/wheel-listing-page/wheel-listing-page.component';
import { PageNotFoundComponent } from './Components/home/page-not-found/page-not-found.component';
import { AdminPanelComponent } from './Components/adminPages/admin-panel/admin-panel.component';
import { CreateWheelComponent } from './Components/adminPages/create-wheel/create-wheel.component';
import { CreateSymbolsComponent } from './Components/adminPages/create-symbols/create-symbols.component';
import { UpdateOrDeleteSymbolComponent } from './Components/adminPages/update-or-delete-symbol/update-or-delete-symbol.component';
import { UpdateOrDeleteWheelComponent } from './Components/adminPages/update-or-delete-wheel/update-or-delete-wheel.component';
import { WheelOfFortunePageComponent } from './Components/wheelComponents/wheel-of-fortune-page/wheel-of-fortune-page.component';
import { RtpPageComponent } from './Components/adminPages/rtp-page/rtp-page.component';

export const routes: Routes = [
  { path: ROUTES_UI.DEFAULT, pathMatch: 'full', redirectTo: ROUTES_UI.LOGIN },

  // User Routes
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
    path: ROUTES_UI.WHEEL_OF_FORTUNE_TEST,
    component: WheelOfFortuneComponent,
    canActivate: [canActivate],
  },
  {
    path: ROUTES_UI.WHEEL_LISTING_PAGE,
    component: WheelListingPageComponent,
    canActivate: [canActivate],
  },
  {
    path: ROUTES_UI.WHEEL_OF_FORTUNE,
    component: WheelOfFortunePageComponent,
    canActivate: [canActivate],
  },

  // Admin Routes
  {
    path: ROUTES_UI.ADMIN_DASHBOARD,
    component: AdminPanelComponent,
    canActivate: [canActivateAdmin],
  },
  {
    path: ROUTES_UI.CREATE_WHEEL,
    component: CreateWheelComponent,
    canActivate: [canActivateAdmin],
  },
  {
    path: ROUTES_UI.SYMBOL_CREATE,
    component: CreateSymbolsComponent,
    canActivate: [canActivateAdmin],
  },
  {
    path: ROUTES_UI.SYMBOL_UPDATE_OR_DELETE,
    component: UpdateOrDeleteSymbolComponent,
    canActivate: [canActivateAdmin],
  },
  {
    path: ROUTES_UI.WHEEL_UPDATE_OR_DELETE,
    component: UpdateOrDeleteWheelComponent,
    canActivate: [canActivateAdmin],
  },
  {
    path: ROUTES_UI.RTP_PAGE,
    component: RtpPageComponent,
    canActivate: [canActivateAdmin],
  },

  // Wildcard Route
  {
    path: ROUTES_UI.WILDCARD_ROUTE,
    component: PageNotFoundComponent,
  },
];
