import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallsService } from '../../../services/api-calls.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SweetAlertService } from '../../../services/sweet-alert.service';

@Component({
  selector: 'app-wheel-of-fortune-page',
  standalone: true,
  imports: [CommonModule, JsonPipe, FormsModule],
  templateUrl: './wheel-of-fortune-page.component.html',
  styleUrl: './wheel-of-fortune-page.component.css',
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

    trigger('spinStateSmallWheel', [
      state(
        'idle',
        style({ transform: 'rotate({{finalRotationSmallWheel}}deg)' }),
        {
          params: { finalRotationSmallWheel: 0 },
        }
      ),
      state(
        'spin',
        style({ transform: 'rotate({{finalRotationSmallWheel}}deg)' }),
        {
          params: { finalRotationSmallWheel: 0 },
        }
      ),
      transition('idle => spin', [
        animate('5s ease-out'), // Adjust timing for the spin speed
      ]),
      transition('spin => idle', []), // No transition back to idle, it will just stop
    ]),
  ],
})
export class WheelOfFortunePageComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  apiCalls: ApiCallsService = inject(ApiCallsService);
  sweetAlert: SweetAlertService = inject(SweetAlertService);

  bigWheel: any;
  smallWheel: any;
  allSymbols: any;
  selectedWheelId: string;
  auto: boolean = false;
  segmentAngleOfOuter: number = 0
  segmentAngleOfInner: number = 0
  indexOuter: number = 1;
  indexInner: number = 1;


  animationState = 'idle';
  animationStateSmallWheel = 'idle';

  finalRotation = 0;
  finalRotationSmallWheel = 0;
  betAmount: number = 100;


  ngOnInit(): void {

    this.selectedWheelId = this.route.snapshot.params?.['wheelId']
    this.apiCalls
      .findWheelById(this.selectedWheelId)
      .subscribe({
        next: (res: any) => {
          console.log(res.data);


          this.bigWheel = res.data[0].symbols[0];
          this.smallWheel = res.data[0].symbols[1];


          // segment angle
          this.segmentAngleOfOuter = 360 / (this.bigWheel.length);
          this.segmentAngleOfInner = 360 / (this.smallWheel.length);


          this.allSymbols = [...this.bigWheel, ...this.smallWheel];
          this.allSymbols = this.allSymbols.filter(
            (symbol: any, index: number, self: any) =>
              index === self.findIndex((s: any) => s._id === symbol._id)
          );
        },
        error: (error) => { },
      });
  }

  getTransformStyle(index: number, angle: number): string {
    return `rotate(${index * angle}deg)`; // Adjusting rotation based on index
  }

  getZIndex(index: number, startIndex: number): number {
    return index + startIndex; // Incrementing z-index based on index
  }


  autoBtn() {
    this.auto = !this.auto
  }

  startTheSpin() {
    this.apiCalls.spinTheWheel(this.betAmount, this.selectedWheelId).subscribe({
      next: (res: any) => {
        if (res.data.outcome.length === 1) {
          this.spinWheel(res.data.outcome[0]);

        } else if (res.data.outcome.length === 2) {

          this.spinWheel(res.data.outcome[0]);

          setTimeout(() => {
            this.spinWheelInner(res.data.outcome[1])
          }, 5000);

        } else if (res.data.outcome.length === 3) {
          this.spinWheel(res.data.outcome[0]);

          setTimeout(() => {
            this.spinWheelInner(res.data.outcome[1])
          }, 5000);

          setTimeout(() => {
            this.sweetAlert.success("JACKPOT")
          }, 10000);
        }
      },
      error: (error) => {
        this.sweetAlert.error(error.message);
      }
    });
  }


  spinWheel(outcome: string) {

    this.finalRotation = 0;
    const index = this.bigWheel.findIndex((data: any) => String(data._id) === String(outcome));
    if (index !== -1) {
      const targetAngle = index * this.segmentAngleOfOuter + 68;
      const fullRotations = 360 * 5 * this.indexOuter;

      this.finalRotation = fullRotations + targetAngle;

      this.animationState = 'spin';
      this.indexOuter++;

      setTimeout(() => {
        this.animationState = 'idle';
      }, 5000);


    }

  }
  spinWheelInner(outcome: string) {


    this.finalRotationSmallWheel = 0;
    const index = this.smallWheel.findIndex((data: any) => String(data._id) === String(outcome));

    if (index !== -1) {
      const targetAngle = index * this.segmentAngleOfInner + 263;
      const fullRotations = 360 * 5 * this.indexInner; // Full rotations to speed up the spin

      this.finalRotationSmallWheel = fullRotations + targetAngle;

      this.animationStateSmallWheel = 'spin';
      this.indexInner++;

      setTimeout(() => {
        this.animationStateSmallWheel = 'idle';
      }, 5000);

    }
  }
}
