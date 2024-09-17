import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-wheel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-wheel.component.html',
  styleUrl: './create-wheel.component.css'
})
export class CreateWheelComponent {
  // wheelSegments: number[] = new Array(12).fill(0);  // Adjust based on how many segments you need
  // symbols: string[] = new Array(this.wheelSegments.length).fill(null);  // To store selected symbols
  // availableSymbols: string[] = [
  //   'path/to/symbol1.png', 
  //   'path/to/symbol2.png', 
  //   'path/to/symbol3.png',
  //   // Add more symbols as needed
  // ];
  // isSymbolSelectorOpen = false;
  // selectedSegmentIndex: number = -1;

  // // Opens the symbol selector for the clicked segment
  // selectSymbol(index: number) {
  //   this.selectedSegmentIndex = index;
  //   this.isSymbolSelectorOpen = true;
  // }

  // // Selects a symbol from available options and closes the selector
  // chooseSymbol(symbol: string, index: number) {
  //   this.symbols[index] = symbol;
  //   this.isSymbolSelectorOpen = false;
  // }

  // // Closes the symbol selector without making any changes
  // closeSymbolSelector() {
  //   this.isSymbolSelectorOpen = false;
  // }

  
}
