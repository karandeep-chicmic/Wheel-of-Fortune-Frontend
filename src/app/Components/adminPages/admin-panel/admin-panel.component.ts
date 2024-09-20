import { Component, OnInit, inject } from '@angular/core';
import { ApiCallsService } from '../../../services/api-calls.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { ROUTES_UI } from '../../../constants';
import { Router } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { ModalComponent } from '../../helper/modal/modal.component';
import { CommonFunctionsAndVarsService } from '../../../services/common-functions-and-vars.service';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [JsonPipe, CommonModule, ModalComponent, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent implements OnInit {
  apiCalls: ApiCallsService = inject(ApiCallsService);
  sweetAlert: SweetAlertService = inject(SweetAlertService);
  commonFuncs: CommonFunctionsAndVarsService = inject(
    CommonFunctionsAndVarsService
  );
  router: Router = inject(Router);

  gameDetails: any;
  totalWins: number = 0;
  totalLosses: number = 0;
  totalGames: number = 0;
  adminIncome: number = 0;
  adminDetails: any = [];
  userSearchDetails: any = [];
  showModal: boolean = false;
  private searchSubject = new Subject<string>();

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
        this.sweetAlert.error(error.error.message);
      },
    });

    this.commonFuncs.showModal.subscribe((data) => {
      this.showModal = data;
    });

    this.searchSubject
      .pipe(
        debounceTime(300), // 300ms debounce time
        distinctUntilChanged() // Only emit when the value changes
      )
      .subscribe((searchText) => {
        this.getAdmin(5, 0, searchText);
        console.log(searchText);
      });

    this.getAdmin(5, 0);
  }

  getAdmin(limit: number, index: number, searchString?: string) {
    if (!searchString) {
      this.apiCalls.getAdmins(index, limit).subscribe({
        next: (response: any) => {
          this.adminDetails = response.data;
        },
        error: (error) => {
          this.sweetAlert.error(error.error.message);
        },
      });
    } else {
      this.apiCalls.searchUser(searchString, index, limit).subscribe({
        next: (response: any) => {
          this.userSearchDetails = response.data;
        },
        error: (error) => {
          this.sweetAlert.error(error.error.message);
        },
      });
    }
  }

  addAdmin() {
    this.showModal = true;
  }

  updateAdmin(userId: any) {
    this.apiCalls.updateRole(userId).subscribe({
      next: (response: any) => {
        this.getAdmin(5, 0);
      },
      error: (error) => {
        this.getAdmin(5, 0);
        this.sweetAlert.error(error.error.message);
      },
    });
  }

  async addRole(userId: string) {
    this.updateAdmin(userId);

    this.showModal = false;
  }

  onToggle(userId: string, admin: any) {
    const previousRole = admin.role;
    this.updateAdmin(userId);
    this.apiCalls.updateRole(userId).subscribe({
      next: (response: any) => {},
      error: (error) => {
        this.getAdmin(5, 0);
        this.sweetAlert.error(error.error.message);
      },
    });
  }

  onSearchChange(event: any) {
    const searchText = event.target.value;
    if (searchText === '') {
      this.getAdmin(10, 0, '');
      return;
    }
    this.searchSubject.next(searchText);
  }

  navigateToPage(type: number) {
    if (type === 1) {
      this.router.navigate([`/${ROUTES_UI.CREATE_WHEEL}`]);
    } else if (type === 2) {
      this.router.navigate([`/${ROUTES_UI.SYMBOL_CREATE}`]);
    } else if (type === 3) {
      this.router.navigate([`/${ROUTES_UI.SYMBOL_UPDATE_OR_DELETE}`]);
    } else if (type === 4) {
      this.router.navigate([`/${ROUTES_UI.WHEEL_UPDATE_OR_DELETE}`]);
    }
  }
}
