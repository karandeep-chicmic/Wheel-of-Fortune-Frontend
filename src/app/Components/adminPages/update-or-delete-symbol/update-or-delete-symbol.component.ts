import { Component, OnInit, inject } from '@angular/core';
import { ApiCallsService } from '../../../services/api-calls.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { Router } from '@angular/router';
import { ROUTES_UI } from '../../../constants';

@Component({
  selector: 'app-update-or-delete-symbol',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './update-or-delete-symbol.component.html',
  styleUrl: './update-or-delete-symbol.component.css',
})
export class UpdateOrDeleteSymbolComponent implements OnInit {
  apiCalls: ApiCallsService = inject(ApiCallsService);
  sweetAlert: SweetAlertService = inject(SweetAlertService);
  router: Router = inject(Router);

  symbolsData: Array<any> = [];

  ngOnInit(): void {
    this.getSymbols(0, 10);
  }

  getSymbols(index: number, limit: number) {
    this.apiCalls.getSymbols(index, limit).subscribe({
      next: (data: any) => {
        this.symbolsData = data.data;
      },
      error: (error) => {
        this.sweetAlert.error(error.error.message);
      },
    });
  }

  updateSymbol(symbolId: string): void {
    this.router.navigate([`/${ROUTES_UI.SYMBOL_CREATE}`], {
      queryParams: { symbolId },
    });
  }

  deleteSymbol(symbolId: string): void {
    this.sweetAlert.deleteMessage().then((result: any) => {
      if (result.isConfirmed) {
        this.apiCalls.deleteSymbol(symbolId).subscribe({
          next: (data: any) => {
            this.sweetAlert.success(`Delete symbol with ID: ${symbolId}`);
            

          },
          error: (error) => {
            this.sweetAlert.error(error.error.message);
          },
        });
      }
    });
    console.log('Delete symbol with ID:', symbolId);
  }
}
