import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../home/navbar/navbar.component';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { MESSAGES, ROLES } from '../../../constants';
import { ApiCallsService } from '../../../services/api-calls.service';


@Component({
  selector: 'app-add-money-page',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './add-money-page.component.html',
  styleUrl: './add-money-page.component.css'
})
export class AddMoneyPageComponent implements OnInit {
  sweetAlert: SweetAlertService = inject(SweetAlertService);
  apiCalls: ApiCallsService = inject(ApiCallsService);

  walletBalance: number = 0;
  amount: number = 0;
  admin: boolean = false;



  ngOnInit(): void {
    const userId = sessionStorage.getItem("userId") ?? "";
    const role = sessionStorage.getItem("role") ?? 0

    if (Number(role) === ROLES.ADMIN) {
      this.admin = true
    }

    this.apiCalls.getWalletBalance(userId).subscribe({
      next: (response: any) => {
        this.walletBalance = response.data.credits;
      },
      error: (error) => {
        this.sweetAlert.error(MESSAGES.ERROR_MESSAGES.WALLET_GET_FAILED);
      }
    })
  }

  addMoney() {
    if (this.amount > 0) {

      this.walletBalance += this.amount;

      this.apiCalls.createTransaction({
        approved: true,
        amount: this.amount,
        paymentType: 0,
      }, sessionStorage.getItem("userId") ?? "").subscribe({
        next: (response: any) => {
          this.sweetAlert.success(MESSAGES.MONEY_ADDED);
          this.amount = 0;
        },
        error: (err) => this.sweetAlert.error(MESSAGES.ERROR_MESSAGES.FAILURE)
      })



    } else {
      this.sweetAlert.error(MESSAGES.INVALID_AMOUNT);
    }
  }

  withdrawMoney() {
    if (this.amount > 0 && this.amount <= this.walletBalance) {
      this.walletBalance -= this.amount;
      this.apiCalls.createTransaction({
        approved: true,
        amount: -this.amount,
        paymentType: 0,
      }, sessionStorage.getItem("userId") ?? "").subscribe({
        next: (response: any) => {
          this.sweetAlert.success(MESSAGES.MONEY_WITHDRAWN);
          this.amount = 0;
        },
        error: (err) => this.sweetAlert.error(MESSAGES.ERROR_MESSAGES.FAILURE)
      })
    } else {
      this.sweetAlert.error(MESSAGES.INVALID_AMOUNT);
    }
  }

  requestFreeCredits() {
    if (this.amount > 0 && this.amount <= this.walletBalance) {
      this.sweetAlert.promptMessage().then((result: any) => {

        if (result.isConfirmed) {
          this.apiCalls.createTransaction({
            approved: false,
            amount: this.amount,
            paymentType: 0,
          }, sessionStorage.getItem("userId") ?? "").subscribe({
            next: (response: any) => {
              this.sweetAlert.success(MESSAGES.CREDITS_REQUESTED);
              this.amount = 0;
            },
            error: (err) => this.sweetAlert.error(MESSAGES.ERROR_MESSAGES.FAILURE)
          })

        } else if (result.isDenied) {

        }
      });
    } else {
      this.sweetAlert.error(MESSAGES.INVALID_AMOUNT);
    }
  }
}
