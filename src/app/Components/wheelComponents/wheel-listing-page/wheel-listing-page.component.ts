import { Component, OnInit, inject } from '@angular/core';
import { ApiCallsService } from '../../../services/api-calls.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { MESSAGES } from '../../../constants';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../home/navbar/navbar.component';

@Component({
  selector: 'app-wheel-listing-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './wheel-listing-page.component.html',
  styleUrl: './wheel-listing-page.component.css',
})
export class WheelListingPageComponent implements OnInit {
  apiCalls: ApiCallsService = inject(ApiCallsService);
  sweetAlert: SweetAlertService = inject(SweetAlertService);
  wheelsData: any;

  ngOnInit(): void {
    

    this.apiCalls.getWheelData().subscribe({
      next: (data: any) => {
        console.log(data);

        this.wheelsData = data.data.wheels;
      },
      error: () => {
        this.sweetAlert.error(MESSAGES.ERROR_MESSAGES.CANT_GET_WHEEL);
      },
    });
  }
}
