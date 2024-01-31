import {Component, OnInit} from '@angular/core';
import {Nomenclature} from "../nomenclature/nomenclature.component";
import {HttpClient} from "@angular/common/http";
import {Unit} from "../goods-inward/goods-inward.component";
import {UriService} from "../uri.service";
import {LoadingSpinnerService} from "../loading-spinner/loading-spinner.service";
import {SweetAlertService} from "../sweet-alert.service";


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
export class ProductsComponent implements OnInit{

  selectedProductItem: any
  urlProduct = this.uriService.getFullUrl('product')
  products: Products[] = [];

  constructor(private http: HttpClient,
              private uriService: UriService,
              protected loadingSpinnerService: LoadingSpinnerService,
              private sweetAlertService: SweetAlertService) {
  }


  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts() {
    this.loadingSpinnerService.show('fetch')
    this.http.get<Products[]>(this.urlProduct).subscribe((data) => {
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.loadingSpinnerService.hide()
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
    this.sweetAlertService.deleteConfirmAlert().then(isConfirmed => {
      if (isConfirmed) {
        this.loadingSpinnerService.show('delete')
        const id = item.id;
        const url = this.uriService.getFullUrl(`product/${id}`);
        this.http.delete(url).subscribe(() => {
          this.loadingSpinnerService.hide()
          this.sweetAlertService.productDeletedAlert()
          this.loadProducts()
        })
      }
    })
  }

}
