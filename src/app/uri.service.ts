import { Injectable } from '@angular/core';
import {BaseUrlService} from "./base-url.service";

@Injectable({
  providedIn: 'root'
})
export class UriService {

  constructor(private baseUrlService: BaseUrlService) { }

  getFullUrl(uri: string): string {
    const baseUrl = this.baseUrlService.getBaseUrl();
    return `${baseUrl}/${uri}`;
  }
}
