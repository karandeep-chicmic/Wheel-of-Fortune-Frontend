import { Component, OnInit, inject } from '@angular/core';
import { ApiCallsService } from '../../../services/api-calls.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { ROUTES_UI } from '../../../constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent implements OnInit {
  apiCalls: ApiCallsService = inject(ApiCallsService);
  sweetAlert: SweetAlertService = inject(SweetAlertService);
  router : Router = inject(Router)

  gameDetails: any;
  totalWins: number = 0;
  totalLosses: number = 0;
  totalGames: number = 0;
  adminIncome: number = 0;

  constructor() {}
  ngOnInit(): void {
    this.apiCalls.getGameDetails().subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.gameDetails = response.data;
        this.totalWins = this.gameDetails[0].winOrLoss.find(
          (win: any) => win._id === 1
        ).count;
        this.totalLosses = this.gameDetails[0].winOrLoss.find(
          (lose: any) => lose._id === 2
        ).count;

        this.totalGames = this.totalWins + this.totalLosses;

        this.adminIncome =
          this.gameDetails[0].total[0].betAmount -
          this.gameDetails[0].total[0].outcomeAmount;
      },
      error: (error) => {
        this.sweetAlert.error(error.message);
      },
    });
  }

  navigateToPage(type: number){
    if(type===1){
      this.router.navigate([`/${ROUTES_UI.CREATE_WHEEL}`]); 
    }
  }
}
