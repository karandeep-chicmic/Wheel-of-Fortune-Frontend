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

  constructor() { }

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
  deleteWheel(wheelId: string) {
    return this.http.delete(
      `${API_ROUTES.BASE_URL}${API_ROUTES.WHEELS}/${wheelId}`
    );
  }
  updateWheel(wheelDetails: any, wheelId: string) {
    return this.http.put(
      `${API_ROUTES.BASE_URL}${API_ROUTES.WHEELS}?id=${wheelId}`,
      wheelDetails
    );
  }
  createWheel(wheelDetails: any) {
    return this.http.post(
      `${API_ROUTES.BASE_URL}${API_ROUTES.WHEELS}`,
      wheelDetails
    );
  }

  // admin apis
  getGameDetails() {
    return this.http.get(
      `${API_ROUTES.BASE_URL}${API_ROUTES.GET_GAME_DETAILS}`
    );
  }

  // game play 
  spinTheWheel(betAmount: number, wheelId: string) {
    return this.http.post(
      `${API_ROUTES.BASE_URL}${API_ROUTES.SPIN_THE_WHEEL}?wheelId=${wheelId}`, { betAmount }
    );
  }

  // rtp global
  setGlobalRtp(rtpPercentage?: number) {
    return this.http.post(
      `${API_ROUTES.BASE_URL}${API_ROUTES.GLOBAL_RTP}`, { rtpPercentage: rtpPercentage }
    );
  }
  getGlobalRtp() {
    return this.http.get(`${API_ROUTES.BASE_URL}${API_ROUTES.GLOBAL_RTP}`);
  }

  // wallet and transactions
  getWalletBalance(userId: string) {
    return this.http.get(`${API_ROUTES.BASE_URL}${API_ROUTES.GET_WALLET_BALANCE}/${userId}`)
  }
  createTransaction(transactionDetails: any, userId: any) {
    return this.http.post(`${API_ROUTES.BASE_URL}${API_ROUTES.CREATE_TRANSACTION}?userId=${userId}`, transactionDetails)
  }
  getTransactions(userId: string, index?: number, limit?: number) {
    return this.http.get(`${API_ROUTES.BASE_URL}${API_ROUTES.CREATE_TRANSACTION}?userId=${userId}&index=${index}&limit=${limit}`)
  }
  updateTransaction(transactionDetails: any, userId: any, id: string) {
    return this.http.put(`${API_ROUTES.BASE_URL}${API_ROUTES.CREATE_TRANSACTION}?userId=${userId}&id=${id}`, transactionDetails)
  }
  getCredits(limit?:number, index?:number){
    return this.http.get(`${API_ROUTES.BASE_URL}${API_ROUTES.CREDITS}?index=${index}&limit=${limit}`)
  }

}
