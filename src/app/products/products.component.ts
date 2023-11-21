import { Component } from '@angular/core';
import {Nomenclature} from "../nomenclature/nomenclature.component";
import {HttpClient} from "@angular/common/http";
import {Unit} from "../goods-inward/goods-inward.component";


export interface Products {
  date: Date
  name: string
  category: string
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
  nomenclatures: Nomenclature[]
  private urlNomenclature = 'http://localhost:3000/nomenclature';
  private urlProduct = 'http://localhost:3000/product';
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


  public loadNomenclatures() {
    this.http.get<Nomenclature[]>(this.urlNomenclature).subscribe(data => {
      this.nomenclatures = data;
    });
  }

  deleteProduct(item: any) {
    const id = item.id
    const url = `http://localhost:3000/product/${id}`
    this.http.delete(url).subscribe(() => {
      this.loadProducts()
    })
  }
}
