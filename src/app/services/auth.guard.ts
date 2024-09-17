import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES, ROUTES_UI } from '../constants';
import { ApiCallsService } from './api-calls.service';

export const canActivate = () => {
  const router: Router = inject(Router);
  if (sessionStorage.getItem('token')) {
    return true;
  } else {
    router.navigate([ROUTES_UI.LOGIN]);
    return false;
  }
};

export const canActivateLogin = () => {
  const router: Router = inject(Router);
  if (!sessionStorage.getItem('token')) {
    return true;
  } else {
    router.navigate([ROUTES_UI.WHEEL_LISTING_PAGE]);
    return false;
  }
};

export const canActivateAdmin = ()=>{
  const router: Router = inject(Router);
  
  const role = Number(sessionStorage.getItem('role'));

  
  if(role === ROLES.ADMIN){
    return true;
  }else{
    router.navigate([ROUTES_UI.WHEEL_LISTING_PAGE]);
    return false
  }


}