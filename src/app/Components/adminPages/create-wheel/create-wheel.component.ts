import { CommonModule, JsonPipe, formatCurrency } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsService } from '../../../services/api-calls.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { NavbarComponent } from '../../home/navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../validators/no-white-space-validator';
import { MESSAGES, ROUTES_UI } from '../../../constants';

@Component({
  selector: 'app-create-wheel',
  standalone: true,
  imports: [CommonModule, NavbarComponent, JsonPipe, ReactiveFormsModule],
  templateUrl: './create-wheel.component.html',
  styleUrl: './create-wheel.component.css'
})
export class CreateWheelComponent implements OnInit {


  activateRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  apiCalls: ApiCallsService = inject(ApiCallsService);
  sweetAlert: SweetAlertService = inject(SweetAlertService);
  fb: FormBuilder = inject(FormBuilder);

  headingText: string = "Create"
  wheelId: string | null = "";
  bigWheel: any = [];
  smallWheel: any = [];
  segmentAngleOfOuter: number = 0
  segmentAngleOfInner: number = 0
  allSymbols: any;
  wheelForm: FormGroup = this.fb.group({
    wheelName: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        // noWhitespaceValidator(),
      ],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
        // noWhitespaceValidator(),
      ],
    ],
  });

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
      this.wheelId = params['wheelId'] || null;
    })

    this.apiCalls.getSymbols(0, 10).subscribe({
      next: (response: any) => {


        this.allSymbols = response.data;

      },
      error: (error: any) => {
        this.sweetAlert.error(error.error.message)
      }
    })

    if (this.wheelId) {
      this.headingText = "Update";
      this.apiCalls.findWheelById(this.wheelId).subscribe({
        next: (res: any) => {
          console.log(res);
          this.bigWheel = res.data[0].symbols[0];
          this.smallWheel = res.data[0].symbols[1];
          this.wheelForm.setValue({
            wheelName: res.data[0].wheelName,
            description: res.data[0].description
          })

          // segment angle
          this.segmentAngleOfOuter = 360 / (this.bigWheel.length);
          this.segmentAngleOfInner = 360 / (this.smallWheel.length);


        },
        error: (err) => {
          this.sweetAlert.error(err.message);
        }
      })
    }
  }

  getTransformStyle(index: number, angle: number): string {
    return `rotate(${index * angle}deg)`; // Adjusting rotation based on index
  }

  getZIndex(index: number, startIndex: number): number {
    return index + startIndex; // Incrementing z-index based on index
  }

  addToOuterWheel(symbol: any, type: number) {
    console.log("inside");

    if (type === 1) {

      if (this.bigWheel.length === 8) {
        return this.sweetAlert.error(MESSAGES.FIRST_REMOVE);
      }
      this.bigWheel.push(symbol)
    } else {
      if (this.smallWheel.length === 6) {
        return this.sweetAlert.error(MESSAGES.FIRST_REMOVE);
      }
      this.smallWheel.push(symbol)
    }
  }

  deleteLastSymbol(type: number) {
    if (type === 1) {
      this.bigWheel.pop();
    } else if (type === 2) {
      this.smallWheel.pop();
    }
  }

  onSubmit() {
    if (this.bigWheel.length !== 8 || this.smallWheel.length !== 6) {
      return this.sweetAlert.error(MESSAGES.FILL_WHEEL)
    }
    if (this.wheelForm.invalid) {
      return this.sweetAlert.error(MESSAGES.INVALID_FORM)
    }

    const symbols = []
    symbols.push(this.bigWheel);
    symbols.push(this.smallWheel);

    const wheelDetails: any = {
      name: this.wheelForm.get('wheelName').value,
      description: this.wheelForm.get('description').value,
      createdBy: sessionStorage.getItem("userId") ?? "",
      symbols: symbols,
    }

    if (this.wheelId) {
      this.apiCalls.updateWheel(wheelDetails, this.wheelId).subscribe({
        next: (response: any) => {
          this.router.navigate([`/${ROUTES_UI.ADMIN_DASHBOARD}`])
        },
        error: (error: any) => {
          this.sweetAlert.error(error.error.message);
        }
      })
    } else {
      this.apiCalls.createWheel(wheelDetails).subscribe({
        next: (response: any) => {
          this.router.navigate([`/${ROUTES_UI.ADMIN_DASHBOARD}`])
        },
        error: (error: any) => {
          this.sweetAlert.error(error.error.message);
        }
      })
    }

  }
}
