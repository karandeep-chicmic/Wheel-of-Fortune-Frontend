import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiCallsService } from '../../../services/api-calls.service';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { MESSAGES } from '../../../constants';

@Component({
  selector: 'app-wheel-of-fortune',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './wheel-of-fortune.component.html',
  styleUrls: ['./wheel-of-fortune.component.css'],
  animations: [
    trigger('spinState', [
      state('idle', style({ transform: 'rotate({{finalRotation}}deg)' }), {
        params: { finalRotation: 0 },
      }),
      state('spin', style({ transform: 'rotate({{finalRotation}}deg)' }), {
        params: { finalRotation: 0 },
      }),
      transition('idle => spin', [
        animate('5s ease-out'), // Adjust timing for the spin speed
      ]),
      transition('spin => idle', []), // No transition back to idle, it will just stop
    ]),
  ],
})
export class WheelOfFortuneComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  @ViewChild('wheel') wheel: any;

  apiCalls: ApiCallsService = inject(ApiCallsService);
  route: ActivatedRoute = inject(ActivatedRoute);
  sweetAlert: SweetAlertService = inject(SweetAlertService);

  wheelId: string = '';
  wheelsData: any;


  outcomes = ['🍎', '🍌', '🍇', '🍉'];
  segmentAngle = 360 / this.outcomes.length;
  selectedOutcome = '';
  finalRotation = 0;
  startRotation = 0;
  animationState = 'idle';
  index = 1;
  timerId: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.wheelId = params.get('wheelId');
    });
    this.apiCalls.findWheelById(this.wheelId).subscribe({
      next: (data: any) => {
        console.log(data);

        this.wheelsData = data.data.wheels;
      },
      error: () => {
        this.sweetAlert.error(MESSAGES.ERROR_MESSAGES.CANT_GET_WHEEL);
      },
    });
  }

  autoSpin() {
    this.timerId = setInterval(() => {
      this.selectedOutcome = this.getRandomOutcome(this.outcomes);
      this.spinWheel();
    }, 6500);
  }

  getRandomOutcome(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }


  spinWheel() {
    this.finalRotation = 0;
    const index = this.outcomes.indexOf(this.selectedOutcome);
    if (index !== -1) {
      const targetAngle = index * this.segmentAngle;
      const fullRotations = 360 * 5 * this.index; // Full rotations to speed up the spin

      this.finalRotation = fullRotations + targetAngle;

      this.animationState = 'spin';

      this.index++;

      setTimeout(() => {
        this.animationState = 'idle';
      }, 5000);
    } else {
      alert('Invalid outcome! Please enter one of the available outcomes.');
    }
  }
}
