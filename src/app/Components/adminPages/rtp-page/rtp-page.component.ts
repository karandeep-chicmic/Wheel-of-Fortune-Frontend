import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../home/navbar/navbar.component';
import { ModalComponent } from '../../helper/modal/modal.component';
import { CommonFunctionsAndVarsService } from '../../../services/common-functions-and-vars.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiCallsService } from '../../../services/api-calls.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { MESSAGES } from '../../../constants';

@Component({
  selector: 'app-rtp-page',
  standalone: true,
  imports: [NavbarComponent, ModalComponent, ReactiveFormsModule],
  templateUrl: './rtp-page.component.html',
  styleUrl: './rtp-page.component.css'
})
export class RtpPageComponent implements OnInit {
  commonFuncs: CommonFunctionsAndVarsService = inject(CommonFunctionsAndVarsService);
  fb: FormBuilder = inject(FormBuilder);
  apiCalls: ApiCallsService = inject(ApiCallsService);
  sweetAlert: SweetAlertService = inject(SweetAlertService);

  isVisible: boolean = false

  form: FormGroup = this.fb.group({
    rtpPercentage: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.commonFuncs.showModal.subscribe((data) => {
      this.isVisible = data;
    });

  }
  allUser() {
    this.isVisible = true
  }

  onSubmit() {
    if (this.form.invalid) {
      this.sweetAlert.error(MESSAGES.INVALID_FORM);
    }

    console.log(this.form.value.rtpPercentage);
    
    this.apiCalls.setGlobalRtp(this.form.value.rtpPercentage).subscribe({
      next: (data) => {
        this.sweetAlert.success(MESSAGES.GLOBAL_RTP);
      },
      error: (error) => {
        this.sweetAlert.error(error.error.message)
      }
    })
  }
}
