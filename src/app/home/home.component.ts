import { Component } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import Swal from 'sweetalert2'
import {SweetAlertService} from "../sweet-alert.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private spinnerService: NgxSpinnerService, private sweetAlertService: SweetAlertService) {
  }
  showSpinner() {
      this.spinnerService.show()
    setTimeout(() => {
      this.spinnerService.hide();

    }, 3000);
  }
}
