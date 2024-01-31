import { Injectable } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  private defaultMessages = {
    create: 'Creating, please wait...',
    update: 'Updating, please wait...',
    delete: 'Deleting, please wait...',
    save: 'Saving please, wait...',
    fetch: 'Fetching, please wait...'
  }
  private customMessage = this.defaultMessages.save;
  constructor(private spinnerService: NgxSpinnerService) {}

  show(action: 'create' | 'update' | 'delete' | 'save' | 'fetch'): void {
    this.customMessage = this.defaultMessages[action] || this.defaultMessages.save;
    this.spinnerService.show();
  }

  hide(): void {
    this.customMessage = this.defaultMessages.save;
    this.spinnerService.hide();
  }

  getMessage(): string {
    return this.customMessage;
  }
}
