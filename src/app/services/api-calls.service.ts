import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_ROUTES } from '../constants';
import { user } from '../interfaces/user.interface';
import { symbols } from '../interfaces/symbol.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  http: HttpClient = inject(HttpClient);

  constructor() {}

  // userAuth
  loginUser(userData: user) {
    return this.http.post(API_ROUTES.BASE_URL + API_ROUTES.LOGIN, userData);
  }
  registerUser(userData: FormData) {
    return this.http.post(API_ROUTES.BASE_URL + API_ROUTES.REGISTER, userData);
  }
  getUserRole() {
    return this.http.get(API_ROUTES.BASE_URL + API_ROUTES.ROLE);
  }
  updateRole(userId: string) {
    return this.http.put(
      `${API_ROUTES.BASE_URL}${API_ROUTES.UPDATE_ROLE}?id=${userId}`,
      {}
    );
  }
  getAdmins(index: number, limit: number) {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.ADMIN}?limit=${limit}&index=${index}`
    );
  }
  searchUser(searchString: string, index: number, limit: number) {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.ADMIN}?limit=${limit}&index=${index}&searchString=${searchString}`
    );
  }

  // otp verification
  sendOtp(email: string) {
    return this.http.post(API_ROUTES.BASE_URL + API_ROUTES.SEND_OTP, {
      email: email,
    });
  }

  validateOtp(email: string, otp: number) {
    return this.http.post(API_ROUTES.BASE_URL + API_ROUTES.VERIFY_OTP, {
      email: email,
      otp: otp,
    });
  }

  // file upload
  fileUpload(formData: FormData) {
    return this.http.post(
      API_ROUTES.BASE_URL + API_ROUTES.FILE_UPLOAD,
      formData
    );
  }

  // symbols Apis
  addSymbol(symbolData: symbols) {
    return this.http.post(API_ROUTES.BASE_URL + API_ROUTES.SYMBOL, symbolData);
  }
  getSymbols(index: number, limit: number) {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.SYMBOL}?index=${index}&limit=${limit}`
    );
  }
  deleteSymbol(symbolId: string) {
    return this.http.delete(
      `${API_ROUTES.BASE_URL}${API_ROUTES.SYMBOL}/${symbolId}`
    );
  }
  getSymbolDetail(symbolId: string) {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.SYMBOL}?id=${symbolId}`
    );
  }
  updateSymbol(symbolId: string, symbolData: symbols) {
    return this.http.put(
      `${API_ROUTES.BASE_URL}${API_ROUTES.SYMBOL}?id=${symbolId}`,
      symbolData
    );
  }

  // wheel apis
  getWheelData(index: number = 0, limit: number = 10) {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.WHEELS}?index=${index}&limit=${limit}`
    );
  }
  findWheelById(id: string) {
    return this.http.get(`${API_ROUTES.BASE_URL}${API_ROUTES.WHEELS}?id=${id}`);
  }

  // admin apis
  getGameDetails() {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.GET_GAME_DETAILS}`
    );
  }
}
