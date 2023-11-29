import {Component, Input, OnInit} from '@angular/core';
import {Products} from "../../products/products.component";
import {Subject} from "rxjs";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Products
  isClicked = false
  amount = 0

  ngOnInit() {
    this.productService.isCartCleared.subscribe(() => {
        this.amount = 0
        this.isClicked = false;
    })
  }

  constructor(private productService: ProductService) {
  }


  formatNumberWithSpaceSeparator(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  onAdd() {
    this.isClicked = !this.isClicked
    this.onIncrement()
  }

  onDecrement() {
    this.amount--;
    if (this.amount === 0) {
      this.isClicked = false;
    }
    this.changeAmount()
  }

  onIncrement() {
    this.amount++
    this.changeAmount()
  }

  changeAmount() {
    const productDetail = {
      productID: this.product.id,
      productName: this.product.name,
      productAmount: this.amount,
      productPrice: this.product.salePrice,
      total: this.amount * this.product.salePrice,
      imageUrl: this.product.imageUrl
    }
    this.productService.addToCart(productDetail);

  }

}
