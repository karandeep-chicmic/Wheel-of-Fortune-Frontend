import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  success(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: message,
    });
  }

  error(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'error',
      title: message,
    });
  }

  successModalMsg(message: string) {
    Swal.fire({
      title: 'Success',
      text: message,
      icon: 'success',
    });
  }

  logoutMessage(): any {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You want to logout!?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    });
  }

  deleteMessage(): any {
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });
  }

  promptMessage(): any {
    return Swal.fire({
      title: "Are you sure to request credits(you will have to return the credits with interest of 10%)?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    })
  }
  constructor() { }
}
