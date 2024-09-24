import { Component, inject } from '@angular/core';
import { ApiCallsService } from '../../../services/api-calls.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { MESSAGES, ROUTES_UI } from '../../../constants';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-or-delete-wheel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './update-or-delete-wheel.component.html',
  styleUrl: './update-or-delete-wheel.component.css',
})
export class UpdateOrDeleteWheelComponent {
  apiCalls: ApiCallsService = inject(ApiCallsService);
  sweetAlert: SweetAlertService = inject(SweetAlertService);
  router: Router = inject(Router);
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

  updateWheel(wheelId: string) {
    this.router.navigate([`/${ROUTES_UI.CREATE_WHEEL}`], {
      queryParams: {
        wheelId: wheelId,
      },
    });
  }

  deleteWheel(wheelId: string) {
    this.sweetAlert.deleteMessage().then((result: any) => {
      if (result.isConfirmed) {
        this.apiCalls.deleteWheel(wheelId).subscribe({
          next: (data: any) => {

            this.sweetAlert.success(`Delete wheel with ID: ${wheelId}`);
            this.wheelsData = this.wheelsData.filter((data: any) => String(data._id) !== String(wheelId))
          },
          error: (error) => {
            this.sweetAlert.error(error.error.message);
          },
        });
      }
    });
  }

  onToggle(wheelId: string, accessType: number) {
    this.apiCalls.updateWheel({ accessType: (accessType === 1 ? 2 : 1) }, wheelId).subscribe({
      next: (data: any) => {
        
        this.wheelsData.forEach((element: any, idx: number, arr: any) => {

          if (String(element._id) === String(wheelId)) {
            arr[idx].accessType = (accessType === 1 ? 2 : 1);
          }

        });
      },
      error: (error) => {
        this.sweetAlert.error(error.error.message);
      },
    })
  }
}
