import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { ApiCallsService } from '../../../services/api-calls.service';
import { ROUTES_UI } from '../../../constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  sweetAlert: SweetAlertService = inject(SweetAlertService);
  apiCalls: ApiCallsService = inject(ApiCallsService);
  router: Router = inject(Router);

  selectedImage: any;
  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    username: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
  });
  photoUpload(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onSubmit() {
    if (this.form.invalid) {
      this.sweetAlert.error('Please fill all the fields correctly');
      return;
    }


    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('email', this.form.get('email')?.value);
    formData.append('password', this.form.get('password')?.value);
    formData.append('username', this.form.get('username')?.value);
    formData.append('file', this.selectedImage);

    this.apiCalls.registerUser(formData).subscribe({
      next: (data: any) => {
        sessionStorage.setItem('email', data.data.userDetails.email);
        this.router.navigate([ROUTES_UI.OTP_TEST]);
      },
      error: (err) => {
        console.log('ERROR is:', err);
        if (err.status === 421) {
          sessionStorage.setItem('email', err.error.data.email);

          this.router.navigate([ROUTES_UI.OTP_TEST]);
        }

        this.sweetAlert.error('Cant Register due to error or wrong fields !!');
      },
    });
  }
}
