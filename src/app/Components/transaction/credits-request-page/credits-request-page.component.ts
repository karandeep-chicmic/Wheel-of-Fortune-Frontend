import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../home/navbar/navbar.component';
import { ApiCallsService } from '../../../services/api-calls.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-credits-request-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './credits-request-page.component.html',
  styleUrl: './credits-request-page.component.css',
  animations: [
    trigger('fadeInTable', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeInRow', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('0.3s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class CreditsRequestPageComponent implements OnInit {
  apiCalls: ApiCallsService = inject(ApiCallsService);
  sweetAlert: SweetAlertService = inject(SweetAlertService);

  creditRequests: any = [];

  ngOnInit(): void {
    this.getCredits(0, 10);
  }

  getCredits(index?: number, limit?: number) {
    this.apiCalls.getCredits(limit, index).subscribe({
      next: (response: any) => {
        this.creditRequests = response.data

      },
      error: (error) => {
        this.sweetAlert.error(error.error.message);
      }
    })
  }
  isAdmin() {
    return sessionStorage.getItem('role') === '1';
  }

  approveRequest(request: any) {

    this.apiCalls.updateTransaction({ approved: true }, request.userId, request._id).subscribe({
      next: (response: any) => {
        console.log(response);

      },
      error: (error) => {
        this.sweetAlert.error(error.error.message);
      }
    })
    request.approved = true;
    request.updatedAt = new Date().toISOString();
  }
}
