import {Component, Input} from '@angular/core';
import {ProductDetails, ProductService} from "../../../product.service";
import {ProductComponent} from "../../product.component";

@Component({
  selector: 'app-product-in-cart',
  templateUrl: './product-in-cart.component.html',
  styleUrls: ['./product-in-cart.component.css']
})
export class ProductInCartComponent {
  @Input() product: ProductDetails
  amount: number

  ngOnInit() {
    this.productService.amount$.subscribe(amount => {
      this.amount = amount
    })
  }

  constructor(private productService: ProductService) {
  }


  formatNumberWithSpaceSeparator(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }



}
