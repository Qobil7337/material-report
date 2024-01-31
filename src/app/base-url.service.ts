import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {
  private baseUrl = 'http://localhost:8080';
  getBaseUrl(): string {
    return this.baseUrl;
  }
  constructor() { }
}
