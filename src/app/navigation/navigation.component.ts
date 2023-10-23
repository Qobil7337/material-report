import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private router: Router) {
  }
  onClickToNomenclature() {
    this.router.navigate(['/nomenclature'])
  }

  onClickToCalculation() {
    this.router.navigate(['/calculation'])
  }

  onClickToGoodsInward() {
    this.router.navigate(['/goods-inwards'])
  }

  onClickToSales() {
    this.router.navigate(['/sales'])
  }

  onClickToRemainingStocks() {
    this.router.navigate(['/remaining-stocks'])
  }

  onClickToMaterialReport() {
    this.router.navigate(['/material-report'])
  }
}
