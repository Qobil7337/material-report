import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {
  private baseUrl = 'http://104.131.6.181:8080';
  getBaseUrl(): string {
    return this.baseUrl;
  }
  constructor() { }
}
