import { Component } from '@angular/core';
import {Nomenclature} from "../nomenclature/nomenclature.component";
import {HttpClient} from "@angular/common/http";
import {Unit} from "../goods-inward/goods-inward.component";


export interface Products {
  date: Date
  id: number
  name: string
  category: string
  imageUrl: string
  productItem: [
    {
      nomenclatureID: number,
      nomenclatureName: string,
      unit: Unit,
      quantity: number,
      price: number,
      sum: number
    }
  ]
  totalCost: number
  salePrice: number
  grossProfit: number
  grossProfitMargin: number
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  selectedProductItem: any
  private urlProduct = 'https://whale-app-cb8sf.ondigitalocean.app/product';
  products: Products[] = [];

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts() {
    this.http.get<Products[]>(this.urlProduct).subscribe((data) => {
      this.products = data
    })
  }

  openModal(item: any) {
    this.selectedProductItem = item
  }

  formatNumberWithSpaceSeparator(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }



  deleteProduct(item: any) {
    const id = item.id
    const url = `https://whale-app-cb8sf.ondigitalocean.app/product/${id}`
    this.http.delete(url).subscribe(() => {
      this.loadProducts()
    })
  }
}
