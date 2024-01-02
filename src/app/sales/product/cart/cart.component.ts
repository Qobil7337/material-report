import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductDetails, ProductService} from "../../product.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  @Output() orderSaved: EventEmitter<any> = new EventEmitter<any>()
  cartItems: ProductDetails[] = []
  total: number
  urlOrder = 'https://whale-app-cb8sf.ondigitalocean.app/order'
  @Output() clearCart: EventEmitter<any> = new EventEmitter<any>()
  constructor(private productService: ProductService,
              private http: HttpClient,
              private router: Router) {}

  ngOnInit() {
    this.productService.getCartObservable().subscribe((product: ProductDetails) => {
      this.checkCart(product)
      this.calculateTotal()
    });
  }
  checkCart(product: ProductDetails) {
    const existingProductIndex = this.cartItems.findIndex(
      (productInCart) => productInCart.productName === product.productName
    );

    if (existingProductIndex !== -1) {
      // Product is already in the cart
      if (product.productAmount === 0) {
        // Remove the item from the cart if its amount is 0
        this.cartItems.splice(existingProductIndex, 1);
      } else {
        // Update the amount and total if the item exists
        const existingProduct = this.cartItems[existingProductIndex];
        existingProduct.productAmount = product.productAmount;
        existingProduct.total = product.total;
      }
    } else {
      // Product is not in the cart, add it only if the amount is not 0
      if (product.productAmount !== 0) {
        this.cartItems.push(product);
      }
    }
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((total, item) => {
      return total + item.total
    }, 0)
  }


  formatNumberWithSpaceSeparator(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  // important methods
  //ForEach, Map, Filter, Reduce, Find, FindIndex

  onClear() {
    this.cartItems = []
    this.productService.isCartCleared.emit(true)
  }

  order() {
    const order = {
      date: new Date(),
      orderItems: [...this.cartItems],
      total: this.total
    }
    this.http.post(this.urlOrder, order).subscribe(() => {
      this.orderSaved.emit()
    })
  }

}
