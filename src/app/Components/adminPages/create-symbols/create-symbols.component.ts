import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { ApiCallsService } from '../../../services/api-calls.service';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { API_ROUTES, MESSAGES, ROUTES_UI } from '../../../constants';

@Component({
  selector: 'app-create-symbols',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-symbols.component.html',
  styleUrl: './create-symbols.component.css',
})
export class CreateSymbolsComponent {
  fb: FormBuilder = inject(FormBuilder);
  sweetAlert: SweetAlertService = inject(SweetAlertService);
  apiCalls: ApiCallsService = inject(ApiCallsService);
  router: Router = inject(Router);
  activateRoute: ActivatedRoute = inject(ActivatedRoute);

  symbolTypes = [
    { name: 'Arrow', value: 1 },
    { name: 'Circle', value: 2 },
    { name: 'Square', value: 3 },
    { name: 'Triangle', value: 4 },
  ];

  searchedText: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  searchedUsers: any;
  items: any[] = [];
  filteredItems: any[] = [];
  tag: any[] = [];
  selectedItem: any;
  symbolId: string = '';
  headingText: string = 'Add';

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    symbolType: ['', [Validators.required]],
    image: ['', [Validators.required]],
    amountPayout: ['', [Validators.required]],
    probability: ['', [Validators.required]],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ],
    ],
  });

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
      this.symbolId = params['symbolId'] || null;

      if (this.symbolId) {
        this.apiCalls.getSymbolDetail(this.symbolId).subscribe({
          next: (res: any) => {
            this.headingText = 'Update';

            this.form.patchValue({
              amountPayout: res.data.amountPayout,
              name: res.data.name,
              probability: res.data.probability,
              symbolType: res.data.symbolsType,
              description: res.data.description,
              image: res.data.image,
            });

            this.imagePreview = API_ROUTES.BASE_URL + '/' + res.data.image;
          },
          error: (err) => {
            this.sweetAlert.error(err.message);
          },
        });
      }
    });
  }

  selectedValue: number | undefined;

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedValue = +selectElement.value;

    this.form.controls['symbolType'].setValue(this.selectedValue);
  }

  onSubmit() {
    console.log(this.form.value);

    if (this.form.invalid) {
      this.sweetAlert.error('Please fill all the fields Correctly');
      return;
    }

    const formData = new FormData();

    if (typeof this.form.value?.image !== 'string') {
      formData.append('file', this.form.value?.image);
      var uploadedFileUrl: string = '';
      this.apiCalls.fileUpload(formData).subscribe({
        next: (res: any) => {
          uploadedFileUrl = res.data;
          const payload = {
            name: this.form.value.name,
            image: uploadedFileUrl,
            symbolsType: this.form.value.symbolType,
            description: this.form.value.description,
            amountPayout: this.form.value.amountPayout,
            probability: this.form.value.probability,
          };

          if (this.symbolId) {
            this.apiCalls.updateSymbol(this.symbolId, payload).subscribe({
              next: (data: any) => {
                this.sweetAlert.success(MESSAGES.SYMBOL_CREATED);
                this.router.navigate([ROUTES_UI.SYMBOL_UPDATE_OR_DELETE]);
              },
              error: (err) => {
                this.sweetAlert.error(err.message);
              },
            });
          } else {
            this.apiCalls.addSymbol(payload).subscribe({
              next: (res: any) => {
                console.log(res);
                this.sweetAlert.success(MESSAGES.SYMBOL_CREATED);
                this.router.navigate([ROUTES_UI.ADMIN_DASHBOARD]);
              },
              error: (err) => {
                this.sweetAlert.error(err.message);
                console.log('ERROR is: ', err);
              },
            });
          }
        },
        error: (err) => {
          this.sweetAlert.error(err.message);
        },
      });
    } else {
      const payload = {
        name: this.form.value.name,
        image: this.form.value.image,
        symbolsType: this.form.value.symbolType,
        description: this.form.value.description,
        amountPayout: this.form.value.amountPayout,
        probability: this.form.value.probability,
      };
      this.apiCalls.updateSymbol(this.symbolId, payload).subscribe({
        next: (data: any) => {
          this.sweetAlert.success(MESSAGES.SYMBOL_CREATED);
          this.router.navigate([ROUTES_UI.SYMBOL_UPDATE_OR_DELETE]);
        },
        error: (err) => {
          this.sweetAlert.error(err.message);
        },
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.form.patchValue({ image: file });
    }
  }

  // searchUser(event: any) {
  //   const searchText = event.target.value;
  //   this.searchSubject.next(searchText);
  // } //debouncing

  searchTerm: string = '';
}
