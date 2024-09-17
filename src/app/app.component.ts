import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WheelOfFortuneComponent } from './Components/wheelComponents/wheel-of-fortune/wheel-of-fortune.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WheelOfFortuneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
