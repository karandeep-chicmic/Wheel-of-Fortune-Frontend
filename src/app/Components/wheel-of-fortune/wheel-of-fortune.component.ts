import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
export class WheelOfFortuneComponent {
  constructor(private renderer: Renderer2) {}
  @ViewChild('wheel') wheel: any;

  outcomes = ['🍎', '🍌', '🍇', '🍉'];
  segmentAngle = 360 / this.outcomes.length;
  selectedOutcome = '';
  finalRotation = 0;
  startRotation = 0;
  animationState = 'idle';
  index = 1;
  timerId: any;

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
