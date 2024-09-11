import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonFunctionsAndVarsService {
  showNavbar = new BehaviorSubject<boolean>(false);
  showModal  = new Subject<boolean>();


  constructor() {}
}
