import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiCallsService } from '../../../services/api-calls.service';
import { Router } from '@angular/router';

import { FREE_CREDITS, MESSAGES, ROUTES_UI } from '../../../constants';
import { CommonFunctionsAndVarsService } from '../../../services/common-functions-and-vars.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';

@Component({
  selector: 'app-otp-test',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './otp-test.component.html',
  styleUrl: './otp-test.component.css',
})
export class OtpTestComponent implements OnInit {
  fb: FormBuilder = inject(FormBuilder);
  apiCalls: ApiCallsService = inject(ApiCallsService);
  sweetAlert: SweetAlertService = inject(SweetAlertService);
  router: Router = inject(Router);
  commonFunctions: CommonFunctionsAndVarsService = inject(
    CommonFunctionsAndVarsService
  );

  otpForm: FormGroup = this.fb.group({
    otp: this.fb.array(
      new Array(6)
        .fill(null)
        .map(() =>
          this.fb.control('', [
            Validators.required,
            Validators.pattern('[0-9]'),
          ])
        )
    ),
  });

  ngOnInit(): void {
    const email: string = sessionStorage.getItem('email') ?? '';
    this.apiCalls.sendOtp(email).subscribe({
      next: (res: any) => {
        this.sweetAlert.success('Otp sent successfully to email !!');
      },
      error: (err: any) => {
        this.sweetAlert.error('Something went wrong !!');
      },
    });
  }

  get otpControls() {
    return (this.otpForm.get('otp') as FormArray).controls;
  }

  verifyOtp() {
    if (this.otpForm.valid) {
      const otp = this.otpForm.value.otp.join('');
      const email = sessionStorage.getItem('email') ?? '';
      this.apiCalls.validateOtp(email, Number(otp)).subscribe({
        next: (res: any) => {
          sessionStorage.setItem('email', res.data.email);
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('userId', res.data.userId);
          sessionStorage.setItem('role', res.data.role);

          this.apiCalls.createTransaction({
            amount: FREE_CREDITS,
            paymentType: 0,
            approved: true
          }, res.data.userId).subscribe({
            next: (res: any) => {
              this.sweetAlert.success(res.message);
              this.commonFunctions.showNavbar.next(true);
              this.router.navigate([ROUTES_UI.WHEEL_LISTING_PAGE]);
            },
            error: (err) => {
              this.sweetAlert.error(MESSAGES.ERROR_MESSAGES.FAILURE);
            }
          })

        },
        error: (err) => {
          console.log('ERROR is:', err);
          this.sweetAlert.error('Wrong Otp!!');
        },
      });
    } else {
      this.sweetAlert.error('Invalid OTP');
      console.log('Invalid OTP');
    }
  }

  onKeyUp(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    if (
      input.value &&
      /\d/.test(input.value) &&
      index < this.otpControls.length - 1
    ) {
      const nextInput = document.getElementById(
        `otp-input-${index + 1}`
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
}
